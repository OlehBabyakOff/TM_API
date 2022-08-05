import {createEventService} from "../services/eventService.js";

export const createEventController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const {title, description, startDate, endDate} = req.body;
        const event = await createEventService(userId, title, description, startDate, endDate);
        return res.status(200).json(event);
    } catch (e) {
        return res.status(500).json(e);
    };
};