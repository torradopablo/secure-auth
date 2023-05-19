"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class ConnectorMongoDB {
    constructor() {
        var _a;
        mongoose_1.default.connect((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : '')
            .then(() => console.log('MongoDB connection established successfully'))
            .catch((e) => console.log(`MongoDB connection failed with error: ${e}`));
    }
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new ConnectorMongoDB();
        return this._instance;
    }
}
exports.default = ConnectorMongoDB;
