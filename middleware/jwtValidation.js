import {validateAccessToken} from "../services/tokenService.js";

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return next(res.status(401).json('You are not authorized!'));

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) return next(res.status(401).json('Access token not found!'));

        const userData = await validateAccessToken(accessToken);
        if (!userData) return next(res.status(401).json('Validation error!'));

        req.user = userData;
        next();
    } catch (e) {
        return next(res.status(401).json('You are not authorized!'));
    }
};