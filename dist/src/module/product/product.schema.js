"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const utils_1 = require("../../utils");
exports.createProductSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        gain: joi_1.default.number().required(),
        stock: joi_1.default.number().optional(),
        isActive: joi_1.default.boolean().optional()
    }),
    headers: joi_1.default.object({
        token: joi_1.default.string().required(),
        ...utils_1.generalRules.my_headers
    }),
    params: joi_1.default.object({
        categoryId: utils_1.generalRules._ids.required()
    })
};
exports.getUserProductSchema = {
    headers: joi_1.default.object({
        token: joi_1.default.string().required(),
        ...utils_1.generalRules.my_headers
    }),
};
