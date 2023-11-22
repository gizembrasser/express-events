import eventData from "../../data/events.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

const updateEventById = (id, title, description, categoryIds, location, startTime, endTime) => {
    const event = eventData.events.find(event => event.id === id);

    if (!event) {
        throw new NotFoundError("Event", id);
    }

    event.title = title ?? event.title;
    event.description = description ?? event.description;
    event.categoryIds = categoryIds ?? event.categoryIds;
    event.location = location ?? event.location;
    event.startTime = startTime ?? event.startTime;
    event.endTime = endTime ?? event.endTime;

    return event;
};

export default updateEventById;