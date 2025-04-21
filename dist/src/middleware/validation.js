"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const utils_1 = require("../utils");
const reqKeys = ["body", "params", "query", "headers", "authUser"];
const validationMiddleware = (schema) => async (req, res, next) => {
    var _a;
    let validationArray = [];
    for (const key of reqKeys) {
        const reqKey = req[key];
        const validationResult = (_a = schema[key]) === null || _a === void 0 ? void 0 : _a.validate(reqKey, { abortEarly: false });
        if (validationResult === null || validationResult === void 0 ? void 0 : validationResult.error)
            validationArray.push(validationResult === null || validationResult === void 0 ? void 0 : validationResult.error);
    }
    return validationArray.length ? next(new utils_1.ErrorApp(validationArray, 400)) : next();
};
exports.validationMiddleware = validationMiddleware;
