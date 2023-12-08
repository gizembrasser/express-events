import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteEvent = async (id) => {
    const prisma = new PrismaClient();

    const deleteEvent = await prisma.event.deleteMany({
        where: { id }
    })

    if (!deleteEvent || deleteEvent.count === 0) {
        throw new NotFoundError("Event", id);
    }

    return id;
};

export default deleteEvent;