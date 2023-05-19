"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const winston_1 = __importDefault(require("winston"));
class ServerGlobal {
    constructor() {
        this._logger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    filename: path_1.default.join(__dirname, '../logs.log'),
                    level: 'info',
                }),
            ],
        });
        mongoose_1.default.connect(process.env.DB_ENDPOINT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }).then(() => this._logger.info('MongoDB connection established successfully'))
            .catch((e) => this._logger.error(`MongoDB connection failed with error: ${e}`));
    }
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new ServerGlobal();
        return this._instance;
    }
    get logger() {
        return this._logger;
    }
}
exports.default = ServerGlobal;
