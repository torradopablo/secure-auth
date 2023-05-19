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
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_datasource_1 = __importDefault(require("./datasources/mongodb.datasource"));
//import FruitRepository from './repositories/fruit.mongodb.repository';
const api_1 = __importDefault(require("./api"));
const fruit_route_1 = require("./routes/fruit.route");
dotenv_1.default.config();
function initial() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongodb_datasource_1.default.getInstance();
        yield api_1.default.getInstance();
        yield (0, fruit_route_1.FruitRoute)();
    });
}
initial();
