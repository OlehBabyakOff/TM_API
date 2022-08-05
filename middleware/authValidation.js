import {check, validationResult} from "express-validator";

export const validateAuth = [
    check('email').isEmail().normalizeEmail().withMessage('Invalid email!'),
    check('password').trim().not().isEmpty().isLength({min: 5}).withMessage('Password must be at least 5 characters long!')
];

export const validationMessage = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();
    const error = result[0].msg;
    res.status(500).json(error);
};