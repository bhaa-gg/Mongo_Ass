"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleWare = void 0;
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("../utils");
const multerMiddleWare = (allowed = utils_1.extensible.img) => {
    const fileUploaded = (0, multer_1.default)({
        storage: multer_1.default.diskStorage({}),
        fileFilter: (req, file, cb) => allowed.includes(file === null || file === void 0 ? void 0 : file.mimetype) ? cb(null, true)
            : cb(new utils_1.ErrorApp("Invalid file type", 400), false),
    });
    return fileUploaded;
};
exports.multerMiddleWare = multerMiddleWare;
