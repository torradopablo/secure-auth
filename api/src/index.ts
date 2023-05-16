import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import MongoDB from './datasources/mongodb.datasource';
//import FruitRepository from './repositories/fruit.mongodb.repository';
import Api from './api';
import {FruitRoute} from './routes/fruit.route';
dotenv.config();

async function initial(){
  await MongoDB.getInstance();
  await Api.getInstance();
  await FruitRoute();
}

initial();






