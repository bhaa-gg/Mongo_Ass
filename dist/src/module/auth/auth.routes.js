"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = exports.authRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const auth_controller_1 = require("./auth.controller");
const auth_schema_1 = require("./auth.schema");
const validation_1 = require("../../middleware/validation");
const user_1 = __importDefault(require("../../../Db/Models/user"));
exports.authRoutes = (0, express_1.Router)();
exports.AuthRoutes = exports.authRoutes;
exports.authRoutes.post("/register", (0, middleware_1.errorCatcher)((0, validation_1.validationMiddleware)(auth_schema_1.registerSchema)), (0, middleware_1.errorCatcher)((0, middleware_1.FindEmailExist)(user_1.default)), (0, middleware_1.errorCatcher)(auth_controller_1.register));
exports.authRoutes.post("/login", (0, middleware_1.errorCatcher)((0, validation_1.validationMiddleware)(auth_schema_1.loginSchema)), (0, middleware_1.errorCatcher)(auth_controller_1.login));
