"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class InstanceMongoDB {
    constructor() {
        var _a;
        mongoose_1.default.connect((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : '')
            .then(() => 'MongoDB connection established successfully')
            .catch((e) => `MongoDB connection failed with error: ${e}`);
    }
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new InstanceMongoDB();
        return this._instance;
    }
}
exports.InstanceMongoDB = InstanceMongoDB;
exports.default = InstanceMongoDB;
