import {Router} from "express";
import {createUserController, getUserController, getUsersController, updateUserController, deleteUserController} from "../controllers/userController.js";
import {validateToken} from "../middleware/jwtValidation.js";
import {validateUser, userValidationMessage} from "../middleware/userValidation.js";

const router = new Router();

router.post('/user', validateToken, validateUser, userValidationMessage, createUserController);

router.get('/user/:id', getUserController);
router.get('/users', getUsersController);

router.put('/user/:id', validateToken, updateUserController);

router.delete('/user/:id', validateToken, deleteUserController);

export default router;