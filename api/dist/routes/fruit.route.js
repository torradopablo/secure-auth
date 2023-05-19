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
exports.FruitRoute = void 0;
const api_1 = __importDefault(require("../api"));
const fruit_mongodb_repository_1 = __importDefault(require("../repositories/fruit.mongodb.repository"));
const FruitRoute = () => __awaiter(void 0, void 0, void 0, function* () {
    const Fruit = yield fruit_mongodb_repository_1.default.getInstance();
    api_1.default.getInstance().then(instance => {
        var app = instance.getApp();
        app.post('/fruit/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                res.status(200).send(yield Fruit.save(req.body));
            }
            catch (error) {
                res.status(500).send(error);
            }
        }));
        app.get('/fruit/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                res.status(200).send(yield Fruit.find(req.body));
            }
            catch (error) {
                res.status(500).send(error);
            }
        }));
        app.delete('/fruit/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                res.status(200).send(yield Fruit.delete(req.params.id));
            }
            catch (error) {
                res.status(500).send(error);
            }
        }));
        app.patch('/fruit/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                res.status(200).send(yield Fruit.update(req.params.id, req.body));
            }
            catch (error) {
                res.status(500).send(error);
            }
        }));
    });
});
exports.FruitRoute = FruitRoute;
