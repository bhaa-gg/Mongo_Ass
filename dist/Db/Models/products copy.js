"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
    description: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    imageUrl: { type: String, required: true, trim: true },
    totalPrice: { type: Number, required: true },
    userPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    gain: { type: Number, required: true },
    stock: { type: Number, required: true },
}, { timestamps: true, autoCreate: true, versionKey: false });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
