import eventData from "../../data/events.json" assert { type: "json" };

const getEvents = (createdBy, title) => {
    let events = eventData.events;

    if (createdBy) {
        events = events.filter(event => event.createdBy === createdBy);
    }

    if (title !== undefined) {
        events = events.filter(event => event.title === JSON.parse(title));
    }

    return events;
};

export default getEvents;