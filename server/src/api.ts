import express from 'express';
import passport from 'passport';
import * as PassportGithub  from 'passport-github2'
import bp from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET

passport.use(new PassportGithub.Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3100/auth/github/callback"
},
async function(accessToken:any, refreshToken, profile, done) {    
    try{
      return done(null,profile)
    } catch (error) {
      return done(error,false)
    }
}
));

passport.serializeUser((user,done)=> {
  console.log('Serialize User')
  try {
    done(null,user);
  } catch (error) {
    done(error,null)
  } 
});

passport.deserializeUser((user,done)=>{
  console.log('Deserialize User')
  try {
     done(null,user)
  }  catch(error) {
     done(error,null)
  }
})

const app = express()
const port = process.env.API_PORT

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({ secret: jwtSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); 

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failure' }),
  function(req, res) {
    
    const token = jwt.sign({user:req.user},jwtSecret,{
      expiresIn: "1y",
    });
    
    res.cookie("access_token", token)
    res.redirect(`${process.env.HOME_UI}`);
  });

app.get('/failure', (req,res)=> res.send('Incorrect credentials'))  


app.listen(port || 3100, () => {
  console.log(`⚡️[API]: Server is running at http://localhost:${port}`)
});


export default app;