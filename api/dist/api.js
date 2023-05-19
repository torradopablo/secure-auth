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
const express_1 = __importDefault(require("express"));
const bp = require('body-parser');
class Api {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(bp.json());
        this.app.use(bp.urlencoded({ extended: true }));
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Api.instance) {
                Api.instance = new Api();
                yield Api.instance.connect();
            }
            return Api.instance;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const port = process.env.PORT;
                this.app.listen(port, () => {
                    console.log(`⚡️[API]: Server is running at http://localhost:${port}`);
                });
            }
            catch (error) {
                console.log(`⚡️[API]: Server failed with error: ${error}`);
            }
        });
    }
    getApp() {
        return this.app;
    }
}
exports.default = Api;
