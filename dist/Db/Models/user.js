"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    isLoggedIn: { type: Boolean, default: false },
    authOtp: { type: String, default: null },
}, { timestamps: true, autoCreate: true, versionKey: false });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
