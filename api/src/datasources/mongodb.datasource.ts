import mongoose, { Connection } from 'mongoose';

class MongoDB {
  private static instance: MongoDB;
  private connection: Connection;

  private constructor() {
    this.connection = mongoose.connection;
  }

  public static async getInstance(): Promise<MongoDB> {
    if (!MongoDB.instance) {
        MongoDB.instance = new MongoDB();
      await MongoDB.instance.connect();
    }
    return MongoDB.instance;
  }

  private async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.DB_URL??'');
      console.log('⚡️[DB] MongoDB connection established successfully');
    } catch (error) {
      console.log(`⚡️[DB] MongoDB connection failed with error: ${error}`);
    }
  }

  public getConnection():Connection{
    return this.connection;
  }
/*
  public getModel<T extends Document>(name: string, schema: Schema<T>): Model<T> {
    return this.connection.model<T>(name, schema);
  }*/
}

export default MongoDB;