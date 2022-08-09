import {getEventsService, createEventService, deleteEventService} from "../services/eventService.js";

export const createEventController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const {title, description, startDate, endDate} = req.body;
        const event = await createEventService(userId, title, description, startDate, endDate);
        return res.status(200).json({event, message: 'Event successfully created!'});
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

export const getEventsController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const {page = 1, limit = 1} = req.query;
        const events = await getEventsService(userId, page, limit);
        return res.status(200).json(events);
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

export const deleteEventController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const eventId = req.params.eventId;
        const event = await deleteEventService(userId, eventId);
        return res.status(200).json({event, message: 'Event was successfully deleted!'});
    } catch (e) {
        return res.status(500).json(e.message);
    };
};