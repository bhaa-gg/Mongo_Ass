"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBy = void 0;
const findBy = async (modal, keys) => {
    const item = await modal.findOne(keys);
    return item;
};
exports.findBy = findBy;
