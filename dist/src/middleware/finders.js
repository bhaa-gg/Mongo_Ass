"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNameExist = exports.findById = exports.FindEmailExist = void 0;
const utils_1 = require("../utils");
const FindEmailExist = (modal) => async (req, res, next) => {
    const { email } = req.body;
    const item = await modal.findOne({ email });
    item ? next(new utils_1.ErrorApp("Email already exists", 400)) : next();
};
exports.FindEmailExist = FindEmailExist;
const findById = async (modal, key) => async (req, res, next) => {
    var _a, _b, _c;
    const { id } = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req[key]) !== null && _a !== void 0 ? _a : req === null || req === void 0 ? void 0 : req.params) !== null && _b !== void 0 ? _b : req === null || req === void 0 ? void 0 : req.query) !== null && _c !== void 0 ? _c : req === null || req === void 0 ? void 0 : req.body;
    const item = await modal.findById(id);
    req.item = item;
    item ? next() : next(new utils_1.ErrorApp("Item not found", 404));
};
exports.findById = findById;
const findNameExist = async (modal, key) => async (req, res, next) => {
    var _a, _b, _c;
    const { name } = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req[key]) !== null && _a !== void 0 ? _a : req === null || req === void 0 ? void 0 : req.params) !== null && _b !== void 0 ? _b : req === null || req === void 0 ? void 0 : req.query) !== null && _c !== void 0 ? _c : req === null || req === void 0 ? void 0 : req.body;
    const item = await modal.findOne({ name });
    req.item = item;
    item ? next(new utils_1.ErrorApp("Name already exists", 400)) : next();
};
exports.findNameExist = findNameExist;
