import {Router} from "express";
import {createUserController, getUserController, getUsersController, updateUserController, deleteUserController} from "../controllers/userController.js";

const router = new Router();

router.post('/user', createUserController);

router.get('/user/:id', getUserController);
router.get('/users', getUsersController);

router.put('/user/:id', updateUserController);

router.delete('/user/:id', deleteUserController);

export default router;