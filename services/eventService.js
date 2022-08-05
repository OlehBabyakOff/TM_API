import EventSchema from "../models/Event.js";

export const createEventService = async (userId, title, description, startDate, endDate) => {
    if (!userId && !title && !description && !startDate && !endDate) throw new Error('Empty values are not allowed!');
    const timeCheck = await EventSchema.find({$and: [{startDate: {$lte: startDate}}, {endDate: {$gte: startDate}},
            {startDate: {$lte: endDate}}, {endDate: {$gte: endDate}}]});
    if (timeCheck) throw new Error('You can’t create event for this time');
    const event = await EventSchema.create({user: userId, title, description, startDate, endDate});
    return event;
};