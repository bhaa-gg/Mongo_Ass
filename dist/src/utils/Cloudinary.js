"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryConnection = void 0;
const cloudinary_1 = require("cloudinary");
const CloudinaryConnection = () => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    return cloudinary_1.v2;
};
exports.CloudinaryConnection = CloudinaryConnection;
