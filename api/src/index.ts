import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import MongoDB from './datasources/mongodb.datasource';
import FruitRepository from './repositories/fruit.mongodb.repository';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[API]: Server is running at http://localhost:${port}`);
});

async function initial(){
  let db = await MongoDB.getInstance();
  let r = await FruitRepository.find();
  console.log(r);

}

initial();

