import MongoDB from '../datasources/mongodb.datasource';
const FruitSchema = require( '../schemas/fruit.schema');
import { Model, Document, Schema } from 'mongoose';

  interface IFruit extends Document {
    id: string;
    name: string;
    pricePerKilo: string;
  }
  
  
  class Repository<T extends Document> {
    private model:Model<T>;

    constructor(schema: Schema<T>, collectionName:string)  {

      MongoDB.getInstance().then((db)=>{
        const connection = db.getConnection();
        this.model = connection.model<T>(collectionName, schema);//console.log(this.model);
      });
    }

    public async save(data: Partial<T>): Promise<T> {
      const document = new this.model(data);
      return document.save();
    }

    public async find(): Promise<T[]> {
      try{
        console.log( this.model)
        const documents = await this.model.find({});
        return documents;
      } catch (error) {
        throw new Error(`${error}`);
      }
   
    }
  }

  var FruitRepository =  new Repository<IFruit>(new Schema(FruitSchema.FruitSchema),'Fruit');
  

  export default FruitRepository;



