import { PrismaClient } from "@prisma/client";

const createEvent = async (createdBy, title, description, image, categoryIds, location, startTime, endTime) => {
    const prisma = new PrismaClient();

    return prisma.event.create({
        data: {
            createdBy,
            title,
            description,
            image,
            categoryIds,
            location,
            startTime,
            endTime
        }
    });
};

export default createEvent;