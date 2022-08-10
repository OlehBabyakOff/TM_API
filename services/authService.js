import bcrypt from "bcrypt";
import AuthSchema from "../models/Auth.js";
import UserSchema from "../models/User.js";
import {generateTokens, saveToken, removeToken, findToken, validateRefreshToken} from "./tokenService.js";


export const registrationService = async (email, password) => {
    if (!email && password) throw new Error('Empty values are not allowed!');
    const candidate = await AuthSchema.findOne({email});
    if (candidate) throw new Error(`Email ${email} already exist!`);
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await AuthSchema.create({email, password: hashPassword});
    return user;
};

export const loginService = async (email, password) => {
    if (!email && !password) throw new Error('Empty values are not allowed!');
    const user = await AuthSchema.findOne({email});
    if (!user) throw new Error('User does not exist!');
    const comparePasswords = await bcrypt.compare(password, user.password);
    if (!comparePasswords) throw new Error('Wrong password!');
    const userData = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber
    };
    const tokens = await generateTokens(userData);
    await saveToken(user.id, tokens.refreshToken);
    return {
        ...tokens,
        user
    };
};

export const logoutService = async (refreshToken) => {
    const token = await removeToken(refreshToken);
    return token;
};

export const refreshService = async (refreshToken) => {
    if (!refreshToken) throw new Error('Token does not exist!');
    const userData = await validateRefreshToken(refreshToken);
    const tokenDB = await findToken(refreshToken);
    if (!userData || !tokenDB) throw new Error('Authorization error!');
    const user = await UserSchema.find(userData);
    const userHash = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber
    };
    const tokens = await generateTokens(userHash);
    await saveToken(userHash._id, tokens.refreshToken);
    return {
        ...tokens,
        user
    };
}