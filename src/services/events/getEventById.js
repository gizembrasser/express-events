import eventData from "../../data/events.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

const getEventById = (id) => {
    const event = eventData.events.find(event => event.id === id);

    if (!event) {
        throw new NotFoundError("Event", id);
    }
    return event;
};

export default getEventById;