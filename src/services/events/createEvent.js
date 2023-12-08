import { PrismaClient } from "@prisma/client";

const createEvent = async (createdBy, title, description, image, categoryIds, location, startTime, endTime) => {
    const prisma = new PrismaClient();

    const event = await prisma.event.create({
        data: {
            createdBy: {
                connect: { id: createdBy }
            },
            title,
            description,
            image,
            categoryIds: {
                connect: categoryIds.map((id) => ({ id }))
            },
            location,
            startTime,
            endTime
        }
    });

    return event;
};

export default createEvent;