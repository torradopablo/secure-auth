import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import express from 'express';
import passport from 'passport';
import * as PassportGithub  from 'passport-github2'
import bp from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'

dotenv.config();


const jwtSecret = process.env.JWT_SECRET

const getUser = (token:string) => {
    try {
        if (token) {
            return jwt.verify(token, jwtSecret)
        }
        return null
    } catch (error) {
        return null
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  
});

const { url } = await startStandaloneServer(server, {
  listen: { port: eval(process.env.PORT) || 4000 },
  context: async ({ req, res }) => {
    const token = req.headers.authorization || '';
    const user = await getUser(token.replace('Bearer', ''));
    if (!user)
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    return { user };
  },
});

console.log(`🚀 Apollo server ready at: ${url}`);


var userData:any;

passport.use(new PassportGithub.Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3100/auth/github/callback"
},
async function(accessToken:any, refreshToken, profile, done) {
    
    try{
      console.log(profile)
      return done(null,profile.id)
    } catch (error) {
      return done(error,false)
    }
 
}
));


passport.serializeUser((user:any,done)=> {
  console.log('Serializing User')
  console.log(user);
  userData=user;
   done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  console.log('Deserialize User User')
  console.log(id)
  try {
     done(null,userData.id)
  }  catch(error) {
     done(error,null)
  }
})

const app = express()
const port = process.env.API_PORT

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});


app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

*/

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({ secret: jwtSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); 

//auth
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failure' }),
  function(req, res) {
    console.log(req)
    /*
    const token = jwt.sign({user:req.user},jwtSecret,{
      expiresIn: "1y",
    });
    console.log(token)*/

    //res.cookie("access_token", token)
    res.redirect('/');
  });

app.get('/failure', (req,res)=> res.send('Your auth is not good'))  


app.listen(port || 3100, () => {
  console.log(`⚡️[API]: Server is running at http://localhost:${port}`)
});


