"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const getUserProfile = async (req, res, next) => {
    res.status(200).json({
        message: "User profile fetched successfully",
        user: req.authUser
    });
};
exports.getUserProfile = getUserProfile;
