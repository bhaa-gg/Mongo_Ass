"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCatcher = void 0;
const utils_1 = require("../utils");
const errorCatcher = (fn) => {
    return (req, res, next) => {
        var _a;
        (_a = fn(req, res, next)) === null || _a === void 0 ? void 0 : _a.catch((err) => {
            return next(new utils_1.ErrorApp(err.message, 500));
        });
    };
};
exports.errorCatcher = errorCatcher;
