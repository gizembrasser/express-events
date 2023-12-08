import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateEventById = async (id, title, description, image, categoryIds, location, startTime, endTime) => {
    const prisma = new PrismaClient();

    const updatedEvent = await prisma.event.updateMany({
        where: { id },
        data: {
            title,
            description,
            image,
            categoryIds,
            location,
            startTime,
            endTime
        }
    })

    if (!updatedEvent || updatedEvent.count === 0) {
        throw new NotFoundError("Event", id);
    }

    return {
        message: `Event wiht id ${id} was updated.`
    }
};

export default updateEventById;