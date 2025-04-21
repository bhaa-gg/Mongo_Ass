"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.createCategory = void 0;
const category_1 = __importDefault(require("../../../Db/Models/category"));
const utils_1 = require("../../utils");
const createCategory = async (req, res, next) => {
    var _a;
    const { name, isActive } = req.body;
    const categoryExist = await category_1.default.findOne({ name });
    if (categoryExist)
        return next(new utils_1.ErrorApp("Category already exists", 400));
    const category = await category_1.default.create({ name, isActive, userId: (_a = req.authUser) === null || _a === void 0 ? void 0 : _a._id });
    res.status(201).json({
        message: "Category created successfully",
        category
    });
};
exports.createCategory = createCategory;
const getCategories = async (req, res, next) => {
    var _a;
    const categories = await category_1.default.find({ userId: (_a = req.authUser) === null || _a === void 0 ? void 0 : _a._id });
    res.status(200).json({ categories });
};
exports.getCategories = getCategories;
