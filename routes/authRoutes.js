import {Router} from "express";
import {registrationController, loginController, logoutController} from "../controllers/authController.js";
import {validateAuth, validationMessage} from "../middleware/authValidation.js";

const router = new Router();

// router.get('/refresh', refreshController);

router.post('/registration', validateAuth, validationMessage, registrationController);
router.post('/login', validateAuth, validationMessage, loginController);
router.post('/logout', logoutController);

export default router;