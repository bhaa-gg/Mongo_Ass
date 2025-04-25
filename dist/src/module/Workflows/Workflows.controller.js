"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const utils_1 = require("../../utils");
const products_1 = __importDefault(require("./../../../Db/Models/products"));
const mongoose_1 = __importDefault(require("mongoose"));
const Workflows_1 = __importDefault(require("../../../Db/Models/Workflows"));
const date_fns_1 = require("date-fns");
const createOrder = async (req, res, next) => {
    const { products = [] } = req.body;
    const user = req.authUser;
    const productChecks = products.map((p) => ({
        _id: new mongoose_1.default.Types.ObjectId(p.id),
        stock: { $gte: p.quantity }
    }));
    let myProducts = await products_1.default.find({
        userId: user._id,
        $or: productChecks
    });
    if (!myProducts.length || !myProducts || myProducts.length !== products.length)
        return next(new utils_1.ErrorApp("Wrong in id or your Quantity of Products", 404));
    let totalAmount = 0;
    products.forEach((p2) => {
        myProducts.forEach(async (p) => {
            if (p._id == p2.id) {
                totalAmount += p.totalPrice * p2.quantity;
                await products_1.default.updateOne({ _id: p._id }, { $set: { stock: p.stock - p2.quantity } });
            }
        });
    });
    const newOrder = new Workflows_1.default({
        userId: user._id,
        products,
        status: utils_1.WorkflowStatus.APPROVED,
        totalSalary: totalAmount
    });
    await newOrder.save();
    res.json({ message: "Success", newOrder });
};
exports.createOrder = createOrder;
const getOrders = async (req, res, next) => {
    const { startDate = new Date(), endDate, status, totalSalaryFrom = 1, totalSalaryTo } = req.query;
    const user = req.authUser;
    const searchQuery = {
        userId: user._id,
        createdAt: {
            $gte: (0, date_fns_1.format)(startDate.toString(), "yyyy-MM-dd"),
        },
        totalSalary: {
            $gte: Number(totalSalaryFrom),
        }
    };
    if (totalSalaryTo)
        searchQuery.totalSalary.$lte = Number(totalSalaryTo);
    if (endDate)
        searchQuery.createdAt.$lte = (0, date_fns_1.format)(endDate.toString(), "yyyy-MM-dd");
    if (status)
        searchQuery.status = status;
    const orders = await Workflows_1.default.find(searchQuery);
    if (!orders || !orders.length)
        return next(new utils_1.ErrorApp("Not Found This orders", 400));
    return res.status(200).json({ message: "Success", orders });
};
exports.getOrders = getOrders;
