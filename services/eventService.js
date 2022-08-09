import EventSchema from "../models/Event.js";
import UserSchema from "../models/User.js";

export const createEventService = async (userId, title, description, startDate, endDate) => {
    if (!userId && !title && !description && !startDate && !endDate) throw new Error('Empty values are not allowed!');
    if (new Date(startDate) < Date.now()) throw new Error('You cannot create an event with a past date!');
    if (new Date(endDate) < new Date(startDate)) throw new Error('The end date cannot be less than the start date!');

    // const timeCheck = await EventSchema.find({user:userId, $and: [{startDate: {$lte: startDate}}, {endDate: {$gte: startDate}},
    //         {startDate: {$lte: endDate}}, {endDate: {$gte: endDate}}]});
    // console.log(timeCheck)
    // if (timeCheck.length) throw new Error('You can’t create event for this time');

    const event = await EventSchema.create({user: userId, title, description, startDate, endDate});
    const user = await UserSchema.findOne({_id: userId});
    await user.events.push(event._id);
    await user.save();
    return event;
};

export const getEventsService = async (userId, page, limit) => {
    if (!userId) throw new Error('Empty values are not allowed!');
    const events = await EventSchema.find({user: userId})
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const countEvents = await EventSchema.countDocuments({user: userId});
    return {
        events,
        total: Math.ceil(countEvents / limit),
        current: page
    };
};

export const deleteEventService = async (userId, eventId) => {
    if (!userId && !eventId) throw new Error('Empty values are not allowed!');
    const user = await UserSchema.findById(userId);

    let myIndex = user.events.indexOf(eventId);
    if (myIndex !== -1) {
        user.events.splice(myIndex, 1);
    }
    await user.save();
    await EventSchema.deleteOne({_id: eventId});
};