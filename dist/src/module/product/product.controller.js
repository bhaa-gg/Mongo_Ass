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
    const product = await products_1.default.findOne({ name });
    if (product) {
        if (image && !product.Image.secure_url) {
            const customId = (0, uuid_1.v4)().slice(0, 4);
            const { secure_url, public_id } = await (0, utils_1.CloudinaryConnection)().uploader.upload(image.path, {
                folder: `products/${customId}`
            });
            product.Image.secure_url = secure_url;
            product.Image.public_id = public_id;
        }
        product.stock += 1;
        await product.save();
        return res.status(201).json({
            message: "Stock increment Success",
            product
        });
    }
    const theProud = { name, description, price, gain, stock, categoryId, userId: user === null || user === void 0 ? void 0 : user._id, Image: {} };
    if (image) {
        const customId = (0, uuid_1.v4)().slice(0, 4);
        console.log(customId);
        const { secure_url, public_id } = await (0, utils_1.CloudinaryConnection)().uploader.upload(image.path, {
            folder: `products/${customId}`
        });
        theProud.Image.secure_url = secure_url;
        theProud.Image.public_id = public_id;
    }
    const newProduct = new products_1.default(theProud);
    await newProduct.save();
    return res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
};
exports.createProduct = createProduct;
const getUserProduct = async (req, res, next) => {
    const user = req.authUser;
    const { categoryId, name, stockFrom = 1, stockTo, priceFrom = 1, priceTo, totalPriceFrom = 1, totalPriceTo } = req.query;
    const searchParams = {
        userId: user._id,
    };
    if (name) {
        searchParams.name = name;
    }
    else {
        if (categoryId)
            searchParams.categoryId = categoryId;
        if (stockFrom || stockTo) {
            searchParams.stock = {};
            if (stockFrom) {
                searchParams.stock.$gte = Number(stockFrom);
            }
            if (stockTo) {
                searchParams.stock.$lte = Number(stockTo);
            }
        }
        if (priceFrom || priceTo) {
            searchParams.price = {};
            if (priceFrom) {
                searchParams.price.$gte = Number(priceFrom);
            }
            if (priceTo) {
                searchParams.price.$lte = Number(priceTo);
            }
        }
        if (totalPriceFrom || totalPriceTo) {
            searchParams.totalPrice = {};
            if (totalPriceFrom) {
                searchParams.totalPrice.$gte = Number(totalPriceFrom);
            }
            if (totalPriceTo) {
                searchParams.totalPrice.$lte = Number(totalPriceTo);
            }
        }
    }
    console.log(searchParams);
    const products = await products_1.default.find(searchParams).populate("categoryId");
    return res.status(200).json({
        message: "Success",
        products
    });
};
exports.getUserProduct = getUserProduct;
