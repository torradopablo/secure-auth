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
const mongodb_datasource_1 = __importDefault(require("../datasources/mongodb.datasource"));
//import {RepositoryI} from '../interfaces/repository';
const FruitSchema = require('../schemas/fruit.schema');
class FruitRepository {
    constructor() { }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!FruitRepository.instance) {
                FruitRepository.instance = new FruitRepository();
                yield FruitRepository.instance.initial();
            }
            return FruitRepository.instance;
        });
    }
    initial() {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_datasource_1.default.getInstance().then((db) => {
                const connection = db.getConnection();
                this.model = connection.model('Fruit', FruitSchema.FruitSchema);
            });
        });
    }
    ;
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = new this.model(data);
                return document.save();
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    ;
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const documents = yield this.model.find(query);
                return documents;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    ;
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.deleteOne({ _id: _id });
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    ;
    update(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.updateOne({ _id: _id }, update);
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
}
exports.default = FruitRepository;
