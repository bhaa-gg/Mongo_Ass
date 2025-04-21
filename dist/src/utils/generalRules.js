"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalRules = exports.idValid = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const idValid = (val, helper) => {
    return mongoose_1.Types.ObjectId.isValid(val) ? val : helper.message("id mustbe valid");
};
exports.idValid = idValid;
exports.generalRules = {
    _ids: joi_1.default.string().custom(exports.idValid),
    my_headers: {
        "content-type": joi_1.default.string().optional(),
        "user-agent": joi_1.default.string().optional(),
        accept: joi_1.default.string().optional(),
        "postman-token": joi_1.default.string().optional(),
        host: joi_1.default.string().optional(),
        "accept-encoding": joi_1.default.string().optional(),
        connection: joi_1.default.string().optional(),
        "content-length": joi_1.default.string().optional(),
    },
    mails: joi_1.default.string().required().email({
        tlds: { allow: true, deny: ["bhaa", "com", "net"] },
        minDomainSegments: 3, // 3 section @a.a.a   
        maxDomainSegments: 3,
    }).messages({
        "any.required": "Mail field is required field",
        "string.email": "Mail field must be a valid email"
    }),
};
