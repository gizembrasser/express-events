import { PrismaClient } from "@prisma/client";

const getCategories = async (name) => {
    const prisma = new PrismaClient();

    return prisma.category.findMany({
        where: {
            name
        }
    })
};

export default getCategories;