import { PrismaClient } from "@prisma/client";

const getEvents = async (title) => {
    const prisma = new PrismaClient();

    return prisma.event.findMany({
        where: {
            title
        }
    })
};

export default getEvents;

