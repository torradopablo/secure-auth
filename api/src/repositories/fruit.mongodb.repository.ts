import MongoDB from '../datasources/mongodb.datasource';
//import {RepositoryI} from '../interfaces/repository';
const FruitSchema = require( '../schemas/fruit.schema');


  interface IFruit extends Document {
    _id: string;
    name: string;
    pricePerKilo: string;
  }

  class FruitRepository {
    private static instance: FruitRepository;
    private model:any;

    constructor() {}

    public static async getInstance(): Promise<FruitRepository> {
      if (!FruitRepository.instance) {
        FruitRepository.instance = new FruitRepository();
        await FruitRepository.instance.initial();
      }
      return FruitRepository.instance;
    }

    private async initial(): Promise<void> {
      MongoDB.getInstance().then((db)=>{
        const connection = db.getConnection();
        this.model = connection.model('Fruit', FruitSchema.FruitSchema);
      });
    }

    public async save(data:IFruit): Promise<IFruit> {
      const document = new this.model(data);
      return document.save();
    }

    public async find(): Promise<IFruit> {
      try{
        const documents = await this.model.find({});
        return documents;
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }

  export default FruitRepository;
