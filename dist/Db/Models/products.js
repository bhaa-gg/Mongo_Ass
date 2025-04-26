"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Category' },
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 30, unique: true },
    description: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    Image: {
        secure_url: {
            type: String,
            required: false,
        },
        public_id: {
            type: String,
            required: false,
        },
    },
    price: { type: Number, required: true },
    gain: { type: Number, required: true },
    totalPrice: { type: Number, required: true, default: function () { return this.price + this.gain; } },
    stock: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true, autoCreate: true, versionKey: false });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
