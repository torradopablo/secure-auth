import MongoDB from '../datasources/mongodb.datasource';
//import {RepositoryI} from '../interfaces/repository';
const FruitSchema = require( '../schemas/fruit.schema');


  export interface IFruit extends Document {
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
    };

    public async save(data:IFruit): Promise<IFruit> {
      try {
        const document = new this.model(data);
        return document.save();
      } catch(error) {
        throw new Error(`${error}`);
      }
    };

    public async find(query:object): Promise<IFruit> {
      try{
        const documents = await this.model.find(query);
        return documents;
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    public async delete(_id:string) : Promise<void> {
      try {
        return await this.model.deleteOne({_id:_id});
      } catch(error) {
        throw new Error(`${error}`);
      }
    };

    public async update(_id:string,update:Partial<IFruit>) : Promise<void> {
      try {
        return await this.model.updateOne({_id:_id},update);
      } catch(error) {
        throw new Error(`${error}`);
      }
    }

  }

  export default FruitRepository;
