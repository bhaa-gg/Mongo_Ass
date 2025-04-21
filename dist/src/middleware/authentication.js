"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const user_1 = __importDefault(require("../../Db/Models/user"));
const verifyToken = (SYQ) => {
    return async (req, res, next) => {
        var _a;
        if (!SYQ) {
            return next(new utils_1.ErrorApp("SYQ Is required", 401));
        }
        let id = (_a = req.params.tokenId) !== null && _a !== void 0 ? _a : req.headers.token;
        if (!id)
            return next(new utils_1.ErrorApp("Token should be here", 401));
        await jsonwebtoken_1.default.verify(id, SYQ, async (err, decoded) => {
            if (err)
                return next(new utils_1.ErrorApp("Invalid Token", 401));
            const user = await user_1.default.findOne({ _id: decoded.userId });
            if (!user)
                return next(new utils_1.ErrorApp("User not found", 404));
            req.authUser = user;
            return next();
        });
    };
};
exports.verifyToken = verifyToken;
