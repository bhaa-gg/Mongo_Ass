"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const product_controller_1 = require("./product.controller");
const product_schema_1 = require("./product.schema");
const utils_1 = require("../../utils");
const productRoutes = (0, express_1.Router)();
exports.ProductRoutes = productRoutes;
productRoutes.post("/:categoryId", (0, middleware_1.multerMiddleWare)(utils_1.extensible.img).single("image"), (0, middleware_1.errorCatcher)((0, middleware_1.validationMiddleware)(product_schema_1.createProductSchema)), (0, middleware_1.errorCatcher)((0, middleware_1.verifyToken)((_a = process.env.LOGIN_SIGNATURE) !== null && _a !== void 0 ? _a : "")), (0, middleware_1.errorCatcher)(product_controller_1.createProduct));
// update product method
productRoutes.post("/", (0, middleware_1.errorCatcher)((0, middleware_1.validationMiddleware)(product_schema_1.getUserProductSchema)), (0, middleware_1.errorCatcher)((0, middleware_1.verifyToken)((_b = process.env.LOGIN_SIGNATURE) !== null && _b !== void 0 ? _b : "")), (0, middleware_1.errorCatcher)(product_controller_1.getUserProduct));
