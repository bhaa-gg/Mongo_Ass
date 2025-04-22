"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const utils_1 = require("../../utils");
const products_1 = __importDefault(require("./../../../Db/Models/products"));
const Workflows_1 = __importDefault(require("../../../Db/Models/Workflows"));
const createOrder = async (req, res, next) => {
    const { productId, productName, amount } = req.body;
    const user = req.authUser;
    const search = {
        userId: user._id
    };
    if (productId)
        search._id = productId;
    if (productName)
        search.name = productName;
    const product = await products_1.default.findOne(search);
    if (!product)
        return next(new utils_1.ErrorApp("Product not found", 404));
    if (!product.stock)
        return next(new utils_1.ErrorApp("Product not found", 404));
    const newOrder = new Workflows_1.default({
        userId: user._id,
        productId: product._id,
        status: utils_1.WorkflowStatus.APPROVED,
        amount
    });
    await newOrder.save();
    product.stock -= 1;
    await product.save();
    res.json({ message: "Success", newOrder });
};
exports.createOrder = createOrder;
