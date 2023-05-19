"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDB {
    constructor() {
        this.connection = mongoose_1.default.connection;
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!MongoDB.instance) {
                MongoDB.instance = new MongoDB();
                yield MongoDB.instance.connect();
            }
            return MongoDB.instance;
        });
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : '');
                console.log('⚡️[DB] MongoDB connection established successfully');
            }
            catch (error) {
                console.log(`⚡️[DB] MongoDB connection failed with error: ${error}`);
            }
        });
    }
    getConnection() {
        return this.connection;
    }
}
exports.default = MongoDB;
