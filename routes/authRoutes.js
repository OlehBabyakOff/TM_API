import {Router} from "express";
import {registrationController, loginController, logoutController, refreshController} from "../controllers/authController.js";
import {validateAuth, authValidationMessage} from "../middleware/authValidation.js";

const router = new Router();

router.get('/refresh', refreshController);

router.post('/registration', validateAuth, authValidationMessage, registrationController);
router.post('/login', validateAuth, authValidationMessage, loginController);
router.post('/logout', logoutController);

export default router;