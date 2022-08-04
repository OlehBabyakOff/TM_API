import jwt from "jsonwebtoken";
import TokenSchema from "../models/Token.js";

export const generateTokens = async (payload) => {
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '1h'});
    const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '30d'});
    return {
        accessToken,
        refreshToken
    };
};

export const saveToken = async (userId, refreshToken) => {
    const tokenData = await TokenSchema.findOne({user:userId});
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = await TokenSchema.create({user: userId, refreshToken});
    return token;
};

export const removeToken = async (refreshToken) => {
    if (!refreshToken) throw new Error('Value does not exist!');
    const token = await TokenSchema.deleteOne({refreshToken});
    return token;
};