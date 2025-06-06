"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const category_controller_1 = require("./category.controller");
const category_schema_1 = require("./category.schema");
const categoryRoutes = (0, express_1.Router)();
exports.CategoryRoutes = categoryRoutes;
categoryRoutes.post("/", (0, middleware_1.errorCatcher)((0, middleware_1.validationMiddleware)(category_schema_1.createCategorySchema)), (0, middleware_1.errorCatcher)((0, middleware_1.verifyToken)((_a = process.env.LOGIN_SIGNATURE) !== null && _a !== void 0 ? _a : "")), (0, middleware_1.errorCatcher)(category_controller_1.createCategory));
categoryRoutes.get("/", (0, middleware_1.errorCatcher)((0, middleware_1.validationMiddleware)(category_schema_1.getCategoriesSchema)), (0, middleware_1.errorCatcher)((0, middleware_1.verifyToken)((_b = process.env.LOGIN_SIGNATURE) !== null && _b !== void 0 ? _b : "")), (0, middleware_1.errorCatcher)(category_controller_1.getCategories));
