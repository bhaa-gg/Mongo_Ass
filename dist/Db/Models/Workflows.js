"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../../src/utils");
const workflowSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Product' },
    status: { type: String, required: true, enum: Object.values(utils_1.WorkflowStatus) },
    amount: { type: Number, required: true },
}, { timestamps: true, autoCreate: true, versionKey: false });
const Workflow = (0, mongoose_1.model)('Workflow', workflowSchema);
exports.default = Workflow;
