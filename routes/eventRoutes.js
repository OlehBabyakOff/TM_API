import {Router} from "express";
import {getEventsController, createEventController, deleteEventController} from "../controllers/eventController.js";
import {eventValidationMessage, validateEvent} from "../middleware/eventValidation.js";

const router = new Router();

router.get('/:userId/events', getEventsController);

router.post('/:userId/event', validateEvent, eventValidationMessage, createEventController);

router.delete('/:userId/event/:eventId', deleteEventController);

export default router;