"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FruitSchema = void 0;
exports.FruitSchema = {
    _id: {
        type: 'string',
        required: true,
    },
    name: {
        type: 'string',
        required: true,
    },
    pricePerKilo: {
        type: 'string',
        required: true,
    },
};
