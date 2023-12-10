import { PrismaClient } from "@prisma/client";

const createEvent = async (title, description, image, categoryIds, location, startTime, endTime, createdBy) => {
    const prisma = new PrismaClient();

    const event = await prisma.event.create({
        data: {
            title,
            description,
            image,
            categoryIds: {
                connect: categoryIds.map((id) => ({ id }))
            },
            location,
            startTime,
            endTime,
            createdBy: {
                connect: { id: createdBy }
            }
        }
    });

    return event;
};

export default createEvent;