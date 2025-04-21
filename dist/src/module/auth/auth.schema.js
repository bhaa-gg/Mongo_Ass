"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const utils_1 = require("../../utils");
exports.loginSchema = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required()
    }).required(),
    headers: joi_1.default.object({
        ...utils_1.generalRules.my_headers
    }).required()
};
exports.registerSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        rePassword: joi_1.default.string().valid(joi_1.default.ref('password')).required()
    }).required(),
    headers: joi_1.default.object({
        ...utils_1.generalRules.my_headers
    }).required()
};
