import { PrismaClient } from "@prisma/client";

const createEvent = async (title, description, image, location, startTime, endTime, categoryIds, createdBy) => {
    const prisma = new PrismaClient();

    const event = await prisma.event.create({
        data: {
            title,
            description,
            image,
            location,
            startTime,
            endTime,
            categoryIds: {
                connect: categoryIds.map((id) => ({ id }))
            },
            createdBy: {
                connect: { id: createdBy }
            }
        }
    });

    return event;
};

export default createEvent;