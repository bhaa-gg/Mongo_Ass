"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProduct = exports.createProduct = void 0;
const utils_1 = require("../../utils");
const products_1 = __importDefault(require("../../../Db/Models/products"));
const category_1 = __importDefault(require("../../../Db/Models/category"));
const uuid_1 = require("uuid");
const createProduct = async (req, res, next) => {
    const { name, description, price, gain, stock } = req.body;
    const { categoryId } = req.params;
    const user = req.authUser;
    const image = req.file;
    const category = await category_1.default.findById(categoryId);
    if (!category)
        return next(new utils_1.ErrorApp("Category not found", 404));
    if (!image)
        return next(new utils_1.ErrorApp("Image is required", 400));
    const product = await products_1.default.findOne({ name });
    if (product) {
        product.stock += 1;
        await product.save();
        return res.status(201).json({
            message: "Product created successfully",
            product
        });
    }
    const customId = (0, uuid_1.v4)().slice(0, 4);
    console.log(customId);
    const { secure_url, public_id } = await (0, utils_1.CloudinaryConnection)().uploader.upload(image.path, {
        folder: `products/${customId}`
    });
    console.log(public_id);
    const newProduct = new products_1.default({ name, description, price, gain, stock, categoryId, userId: user === null || user === void 0 ? void 0 : user._id, Image: { secure_url, public_id } });
    await newProduct.save();
    return res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
};
exports.createProduct = createProduct;
const getUserProduct = async (req, res, next) => {
    const {} = req.params;
    const user = req.authUser;
    const products = await products_1.default.find({ userId: user._id }).populate("categoryId");
    return res.status(200).json({
        message: "Success",
        products
    });
};
exports.getUserProduct = getUserProduct;
