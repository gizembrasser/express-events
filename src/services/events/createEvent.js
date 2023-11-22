import eventData from "../..data/events.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

const createEvent = (createdBy, title, description, image, categoryIds) => {
    const newEvent = {
        id: uuid(),
        createdBy,
        title,
        description,
        image,
        categoryIds
    };

    eventData.events.push(newEvent);
    return newEvent;
};

export default createEvent;