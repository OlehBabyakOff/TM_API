import {Router} from "express";
import {getEventsController, createEventController, deleteEventController} from "../controllers/eventController.js";
import {eventValidationMessage, validateEvent} from "../middleware/eventValidation.js";
import {validateToken} from "../middleware/jwtValidation.js";

const router = new Router();

router.get('/:userId/events', getEventsController);

router.post('/:userId/event', validateToken, validateEvent, eventValidationMessage, createEventController);

router.delete('/:userId/event/:eventId', validateToken, deleteEventController);

export default router;