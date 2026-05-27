// hàm tạo access token - refresh token
// access token:
// - thời gian sống ngắn (1h-2h)
// - chứa thông tin người dùng (id, email, role)
// - lưu trong localStorage

// refresh token:
// - cấp mới access token khi access token hết hạn
// - thời gian sống dài (7-30d)
// - không chứa thông tin người dùng, chỉ chứa id của refresh token
// - lưu trong httpOnly cookie
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET_KEY, JWT_SECRET_KEY } from "../constant/app.constant.js";

export const signAccessToken = (payload) => {
    console.log("JWT_SECRET_KEY:", JWT_SECRET_KEY)
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: "1h"})
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY)
}

export const signRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {expiresIn: "7d"})
}

export const verifyRefreshToen = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET_KEY)
}