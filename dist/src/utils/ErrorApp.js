"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ErrorApp = void 0;
class ErrorApp {
    constructor(message, statusCode) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorApp = ErrorApp;
const errorHandler = (err, req, res, next) => {
    var _a, _b, _c;
    res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).json({
        Error: "Failed Response",
        message: (_b = err.message) !== null && _b !== void 0 ? _b : "Internal Server Error",
        statusCode: (_c = err.statusCode) !== null && _c !== void 0 ? _c : 500
    });
};
exports.errorHandler = errorHandler;
