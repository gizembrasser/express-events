import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateCategoryById = async (id, name) => {
    const prisma = new PrismaClient();
    const updatedCategory = await prisma.category.updateMany({
        where: { id },
        data: {
            name
        }
    })

    if (!updatedCategory || updatedCategory.count === 0) {
        throw new NotFoundError("Category", id);
    }

    return {
        message: `Category with id ${id} was updated.`
    }
};

export default updateCategoryById;