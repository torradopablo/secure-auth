import express, { Application } from 'express';
const bp = require('body-parser')

class Api {
  private static instance: Api;
  private app: Application;

  private constructor() {
    this.app = express();
    this.app.use(bp.json())
    this.app.use(bp.urlencoded({ extended: true }))
  }

  public static async getInstance(): Promise<Api> {
    if (!Api.instance) {
      Api.instance = new Api();
      await Api.instance.connect();
    }
    return Api.instance;
  }

  private async connect(): Promise<void> {
    try {
        const port = process.env.PORT;
        this.app.listen(port, () => {
          console.log(`⚡️[API]: Server is running at http://localhost:${port}`);
        });
    } catch (error) {
      console.log(`⚡️[API]: Server failed with error: ${error}`);
    }
  }

  public getApp():Application{
    return this.app;
  }

 

}

export default Api;