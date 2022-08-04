import bcrypt from "bcrypt";
import UserSchema from "../models/User.js";
import {generateTokens, saveToken, removeToken} from "./tokenService.js";


export const registrationService = async (firstName, lastName, email, phoneNumber, password) => {
    if (!firstName && !lastName && !email && !phoneNumber && password) throw new Error('Empty values are not allowed!');
    const candidate = await UserSchema.findOne({email});
    if (candidate) throw new Error(`Email ${email} already exist!`);
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await UserSchema.create({firstName, lastName, email, phoneNumber, password: hashPassword});
    return user;
};

export const loginService = async (email, password) => {
    if (!email && !password) throw new Error('Empty values are not allowed!');
    const user = await UserSchema.findOne({email});
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