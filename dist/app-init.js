"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const utils_1 = require("./src/utils");
const module_1 = require("./src/module");
const cors_1 = __importDefault(require("cors"));
const main = async () => {
    (0, dotenv_1.config)();
    const app = (0, express_1.default)();
    const port = process.env.PORT || 3000;
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get('/', (req, res) => res.json({ message: 'Hello World!' }));
    app.use("/auth", module_1.AuthRoutes);
    app.use("/user", module_1.UserRoutes);
    app.use("/category", module_1.CategoryRoutes);
    app.use("/product", module_1.ProductRoutes);
    app.use("/orders", module_1.WorkflowsRoutes);
    app.use((req, res, next) => next(new utils_1.ErrorApp("Page not found", 404)));
    app.use(utils_1.errorHandler);
    app.listen(port, (err) => console.log(err ? err : `Example app listening on port ${port}!`));
};
exports.main = main;
