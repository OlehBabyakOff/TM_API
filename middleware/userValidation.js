import {check, validationResult} from "express-validator";

export const validateUser = [
    check('firstName').trim().not().isEmpty().withMessage('First name could not be empty!')
        .not().isNumeric().withMessage('First name could not consist numbers!')
        .isLength({min: 2}).withMessage('First name must be at least 2 characters long!'),
    check('lastName').trim().not().isEmpty().withMessage('Last name could not be empty!')
        .not().isNumeric().withMessage('Last name could not consist numbers!')
        .isLength({min: 2}).withMessage('First name must be at least 2 characters long!'),
    check('email').isEmail().normalizeEmail().withMessage('Invalid email!'),
    check('phoneNumber').trim().not().isEmpty().withMessage('Phone number could not be empty!')
        .isNumeric().withMessage('Phone number could not consist letters!')
        .isLength({min: 10, max: 10}).withMessage('Phone number must be 10 numbers long!')
];

export const userValidationMessage = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();
    const error = result[0].msg;
    return res.status(500).json(error);
};