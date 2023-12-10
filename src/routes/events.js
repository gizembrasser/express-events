import express from "express";
import getEvents from "../services/events/getEvents.js";
import getEventById from "../services/events/getEventById.js";
import createEvent from "../services/events/createEvent.js";
import updateEventById from "../services/events/updateEventById.js";
import deleteEvent from "../services/events/deleteEvent.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const { title, location } = req.query;
        const events = await getEvents(title, location);

        res.json(events);
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { title, description, image, location, startTime, endTime, categoryIds, createdBy } = req.body;
        const newEvent = await createEvent(title, description, image, location, startTime, endTime, categoryIds, createdBy);

        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await getEventById(id);

        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, image, location, startTime, endTime, categoryIds, createdBy } = req.body;
        const updatedEvent = await updateEventById(id, { title, description, image, location, startTime, endTime, categoryIds, createdBy });

        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedEventId = await deleteEvent(id);

        res.status(200).json({
            message: `Event with id ${deletedEventId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;
