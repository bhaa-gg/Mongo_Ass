"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const utils_1 = require("../../utils");
exports.createOrderSchema = {
    body: joi_1.default.object({
        productName: joi_1.default.string().min(1).optional(),
        productId: joi_1.default.string().min(1).optional(),
        amount: joi_1.default.number().positive().required(),
    }).xor('productName', 'productId'), // Ensures exactly one is provided
    headers: joi_1.default.object({
        token: joi_1.default.string().required(),
        ...utils_1.generalRules.my_headers,
    }),
};
