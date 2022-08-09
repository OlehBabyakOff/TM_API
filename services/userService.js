import UserSchema from "../models/User.js";
import EventSchema from "../models/Event.js";
import {getEventsService} from "./eventService.js";

export const createUserService = async (firstName, lastName, email, phoneNumber) => {
    if (!firstName && !lastName && !email && !phoneNumber) throw new Error('Empty values are not allowed!');
    const emailCheck = await UserSchema.findOne({email});
    const phoneCheck = await UserSchema.findOne({phoneNumber});
    if (emailCheck || phoneCheck) throw new Error('User with these values already exist!');
    const user = await UserSchema.create({firstName, lastName, email, phoneNumber});
    return user;
};

export const getUserService = async (userId) => {
    const user = await UserSchema.findById(userId);
    return user;
};

export const getUsersService = async (page, limit) => {
    const users = await UserSchema.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('events');

    const countUsers = await UserSchema.countDocuments();
    return {
        users,
        total: Math.ceil(countUsers / limit),
        current: page
    };
};

export const updateUserService = async (userId, firstName, lastName, email, phoneNumber) => {
    await UserSchema.updateOne({_id: userId}, {
        firstName,
        lastName,
        email,
        phoneNumber
    });
    const user = await UserSchema.findById(userId);
    return user;
};

export const deleteUserService = async (userId) => {
    await UserSchema.deleteOne({_id: userId});
    await EventSchema.deleteMany({user:userId});
};