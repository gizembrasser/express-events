import express from "express";
import getEvents from "../services/events/getEvents.js";
import getEventById from "../services/events/getEventById.js";
import createEvent from "../services/events/createEvent.js";
import updateEventById from "../services/events/updateEventById.js";
import deleteEvent from "../services/events/deleteEvent.js";

const router = express.Router();

router.get("/", (req, res) => {
    const { title } = req.query;
    const events = getEvents(title);
    res.status(200).json(events);
});

router.post("/", (req, res) => {
    const { createdBy, title, description, image, categoryIds, location, startTime, endTime } = req.body;
    const newEvent = createEvent(createdBy, title, description, image, categoryIds, location, startTime, endTime);
    res.status(201).json(newEvent);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const event = getEventById(id);

    res.status(200).json(event);
});

export default router;
