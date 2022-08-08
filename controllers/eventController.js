import {getEventsService, createEventService} from "../services/eventService.js";

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
        const events = await getEventsService(userId);
        return res.status(200).json(events);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};