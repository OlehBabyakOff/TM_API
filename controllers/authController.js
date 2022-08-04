import {registrationService, loginService, logoutService} from "../services/authService.js";

export const registrationController = async (req, res) => {
    try {
        const {firstName, lastName, email, phoneNumber, password} = req.body;
        const user = await registrationService(firstName, lastName, email, phoneNumber, password);
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await loginService(email, password);
        res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

export const logoutController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        const user = await logoutService(refreshToken);
        res.clearCookie('refreshToken');
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e.message);
    };
};