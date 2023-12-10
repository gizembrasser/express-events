import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateCategoryById = async (id, updatedCategory) => {
    const prisma = new PrismaClient();

    const category = await prisma.category.updateMany({
        where: { id },
        data: updatedCategory
    })

    if (!category || category.count === 0) {
        throw new NotFoundError("Category", id);
    }

    return {
        message: `Category with id ${id} was updated.`
    }
};

export default updateCategoryById;