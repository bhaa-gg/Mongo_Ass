"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 30, unique: true },
}, { timestamps: true, autoCreate: true, versionKey: false });
const Category = (0, mongoose_1.model)('Category', categorySchema);
exports.default = Category;
