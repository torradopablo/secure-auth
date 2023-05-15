
import mongoose, { Connection } from 'mongoose';


class MongoDB {

    private static instance: MongoDB;
    private connection: Connection;
    
    private constructor() {
        mongoose.connect(process.env.DB_URL??'');
    
        this.connection = mongoose.connection;
    
        this.connection.on('connected', () => {
            console.log('⚡️[DB] MongoDB connection established successfully');
        });
    
        this.connection.on('error', (err) => {
            console.error(`⚡️[DB] MongoDB connection failed with error: ${err}`);
        });
    }
    
    public static getInstance(): MongoDB {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }
    
    public getConnection(): Connection {
        return this.connection;
    }    
}

export default MongoDB;




