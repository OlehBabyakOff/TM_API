import {Router} from "express";
import {registrationController, loginController, logoutController} from "../controllers/authController.js";

const router = new Router();

// router.get('/refresh', refreshController);
// router.get('/activate/:link', activateController);

router.post('/registration', registrationController);
router.post('/login', loginController);
router.post('/logout', logoutController);

export default router;