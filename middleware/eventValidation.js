import {check, validationResult} from "express-validator";

export const validateEvent = [
    check('title').trim().not().isEmpty().withMessage('Title could not be empty!')
        .isLength({min: 3}).withMessage('Title must be at least 3 characters long!'),
    check('description').trim().not().isEmpty().withMessage('Description could not be empty!')
        .isLength({min: 3}).withMessage('Description must be at least 3 characters long!'),
];

export const eventValidationMessage = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();
    const error = result[0].msg;
    return res.status(500).json(error);
};