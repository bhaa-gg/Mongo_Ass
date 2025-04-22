"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesSchema = exports.createCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const utils_1 = require("../../utils");
exports.createCategorySchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        isActive: joi_1.default.boolean().optional()
    }),
    headers: joi_1.default.object({
        token: joi_1.default.string().required(),
        ...utils_1.generalRules.my_headers
    }).unknown(true)
};
exports.getCategoriesSchema = {
    headers: joi_1.default.object({
        token: joi_1.default.string().required(),
        ...utils_1.generalRules.my_headers
    }).unknown(true)
};
