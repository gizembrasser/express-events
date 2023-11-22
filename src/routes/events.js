import express from "express";
import getEvents from "../services/events/getEvents.js";
import getEventById from "../services/events/getEventById.js";
import createEvent from "../services/events/createEvent.js";
import updateEventById from "../services/events/updateEventById.js";
import deleteEvent from "../services/events/deleteEvent.js";

const router = express.Router();

router.get("/", (req, res) => {
    const { createdBy, title } = req.query;
    const events = getEvents(createdBy, title);
    res.status(200).json(events);
});