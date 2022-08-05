import {Router} from "express";
import {createEventController} from "../controllers/eventController.js";

const router = new Router();

router.post('/:userId/event', createEventController);

export default router;