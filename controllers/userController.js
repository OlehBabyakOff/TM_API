import {createUserService, getUserService, getUsersService, updateUserService, deleteUserService} from "../services/userService.js";

export const createUserController = async (req, res) => {
    try {
        const {firstName, lastName, email, phoneNumber} = req.body;
        const user = await createUserService(firstName, lastName, email, phoneNumber);
        return res.status(200).json({user, message: `User ${user.email} created!`});
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

export const getUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserService(userId);
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

export const getUsersController = async (req, res) => {
    try {
        const {page = 1, limit = 1} = req.query;
        const users = await getUsersService(page, limit);
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

export const updateUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const {firstName, lastName, email, phoneNumber} = req.body;
        const user = await updateUserService(userId, firstName, lastName, email, phoneNumber);
        return res.status(200).json({user, message: `User ${user.email} has been updated!`});
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

export const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await deleteUserService(userId);
        return res.status(200).json({user, message: `User has been deleted!`});
    } catch (e) {
        return res.status(500).json(e.message);
    };
};