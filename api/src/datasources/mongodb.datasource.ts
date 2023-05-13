import mongoose from 'mongoose';

class MongoDB {

    private static _instance: MongoDB;

    private constructor()  {
        mongoose.connect(process.env.DB_URL??'')
        .then(() => console.log('⚡️[DB] MongoDB connection established successfully'))
        .catch((e: mongoose.Error) => console.log(`⚡️[DB] MongoDB connection failed with error: ${e}`));
    }

    static async getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new MongoDB();
        return this._instance;
    }
}

export default MongoDB;