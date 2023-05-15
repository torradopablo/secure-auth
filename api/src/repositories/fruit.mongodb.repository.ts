import MongoDB from '../datasources/mongodb.datasource';
const FruitSchema = require( '../schemas/fruit.schema');
import mongoose from 'mongoose';

const db = MongoDB.getInstance();
const connection = db.getConnection();

interface IFruit extends mongoose.Document {
    _id : string;
    name : string;
    pricePerKio : string;
  };
  
const FruitRepository = connection.model<IFruit>('Fruit', FruitSchema);
export default FruitRepository;