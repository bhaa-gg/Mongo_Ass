"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const utils_1 = require("./src/utils");
const module_1 = require("./src/module");
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = require("./Db/dbConnection");
const middleware_1 = require("./src/middleware");
const middleware_2 = require("./src/middleware");
const auth_schema_1 = require("./src/module/auth/auth.schema");
const user_1 = __importDefault(require("./Db/Models/user"));
const auth_controller_1 = require("./src/module/auth/auth.controller");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Initialize database connection
(0, dbConnection_1.dbConnection)().catch((err) => console.error('DB connection failed:', err));
app.use((0, cors_1.default)({ origin: '*', credentials: true }));
app.use(express_1.default.json());
app.get('/', (req, res, next) => {
    res.json({ message: 'Hello World!s' });
});
app.get('/data', (req, res, next) => {
    res.json({ message: 'Hello Data' });
});
// Auth routes
app.post('/auth/register', (0, middleware_2.errorCatcher)((0, middleware_2.validationMiddleware)(auth_schema_1.registerSchema)), (0, middleware_2.errorCatcher)((0, middleware_1.FindEmailExist)(user_1.default)), (0, middleware_2.errorCatcher)(auth_controller_1.register));
app.post('/auth/login', (0, middleware_2.errorCatcher)((0, middleware_2.validationMiddleware)(auth_schema_1.loginSchema)), (0, middleware_2.errorCatcher)(auth_controller_1.login));
// Module routes
app.use('/user', module_1.UserRoutes);
app.use('/category', module_1.CategoryRoutes);
app.use('/product', module_1.ProductRoutes);
// 404 handler
app.use((req, res, next) => next(new utils_1.ErrorApp('Page not found', 404)));
// Error handler
app.use(utils_1.errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
