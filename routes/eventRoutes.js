import {Router} from "express";
import {getEventsController, createEventController} from "../controllers/eventController.js";
import {eventValidationMessage, validateEvent} from "../middleware/eventValidation.js";

const router = new Router();

router.get('/:userId/events', getEventsController);

router.post('/:userId/event', validateEvent, eventValidationMessage, createEventController);

export default router;