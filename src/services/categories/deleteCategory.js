import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteCategory = async (id) => {
    const prisma = new PrismaClient();

    const deleteCategory = await prisma.category.deleteMany({
        where: { id }
    })

    if (!deleteCategory || deleteCategory.count === 0) {
        throw new NotFoundError("Category", id);
    }

    return id;
};

export default deleteCategory;