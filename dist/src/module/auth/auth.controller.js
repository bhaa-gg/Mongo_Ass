"use strict";
// Auth controller will be implemented here 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const user_1 = __importDefault(require("./../../../Db/Models/user"));
const bcrypt_1 = require("bcrypt");
const utils_1 = require("../../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res, next) => {
    var _a;
    const { email, password } = req.body;
    const user = await user_1.default.findOneAndUpdate({ email }, { isLoggedIn: true });
    if (!user || !(0, bcrypt_1.compareSync)(password, user === null || user === void 0 ? void 0 : user.password))
        return next(new utils_1.ErrorApp("Check your email or password", 404));
    const token = jsonwebtoken_1.default.sign({
        userId: user._id,
        email: user.email,
        name: user.name
    }, (_a = process.env.LOGIN_SIGNATURE) !== null && _a !== void 0 ? _a : "");
    if (!token)
        return next(new utils_1.ErrorApp("Something went wrong", 500));
    return res.status(200).json({ message: "Login successful", user, token });
};
exports.login = login;
const register = async (req, res, next) => {
    let { name, email, password } = req.body;
    password = (0, bcrypt_1.hashSync)(password, Number(process.env.SALT_ROUNDS));
    const user = await user_1.default.create({ name, email, password });
    return res.status(201).json({ message: "User created successfully", user });
};
exports.register = register;
// ! Logout
// ! Forgot Password
// ! Change Password
