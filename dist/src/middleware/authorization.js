"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const utils_1 = require("../utils");
const authorization = (allowedRole) => (req, res, next) => {
    if (!allowedRole.includes(req.authUser.userType))
        return next(new utils_1.ErrorApp("Unauthorized", 401));
    return next();
};
exports.authorization = authorization;
