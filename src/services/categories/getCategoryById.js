import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getCategoryById = async (id) => {
    const prisma = new PrismaClient();

    const category = await prisma.category.findUnique({
        where: { id }
    })

    if (!category) {
        throw new NotFoundError("Category", id);
    }

    return category;
};

export default getCategoryById;