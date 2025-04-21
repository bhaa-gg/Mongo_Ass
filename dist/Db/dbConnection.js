"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => mongoose_1.default.connect(process.env.DB_URI || "").then(() => console.log('Connected to MongoDB')).catch((err) => console.log('Error connecting to MongoDB', err));
exports.dbConnection = dbConnection;
