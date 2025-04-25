"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const utils_1 = require("../../utils");
exports.createOrderSchema = {
    body: joi_1.default.object({
        products: joi_1.default.array().required().items(joi_1.default.object({
            id: utils_1.generalRules._ids.required(),
            quantity: joi_1.default.number().integer().min(1).required(),
        })).min(1),
    }).required(),
    headers: joi_1.default.object({
        token: joi_1.default.string().required(),
        ...utils_1.generalRules.my_headers,
    }),
};
exports.getOrderSchema = {
    query: joi_1.default.object({
        startDate: joi_1.default.date().optional().max(new Date()),
        endDate: joi_1.default.date().optional().greater(joi_1.default.ref('startDate')),
        status: joi_1.default.string().valid(...Object.values(utils_1.WorkflowStatus)).optional(),
        totalSalaryFrom: joi_1.default.number().min(1).optional(),
        totalSalaryTo: joi_1.default.number().greater(joi_1.default.ref('totalSalaryFrom')).optional()
    }),
    headers: joi_1.default.object({
        token: joi_1.default.string().required(),
        ...utils_1.generalRules.my_headers,
    }),
};
