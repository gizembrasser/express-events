import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getUserById = async (id) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: { id }
    })

    if (!user || user.count === 0) {
        throw new NotFoundError("User", id);
    }

    return user;
};

export default getUserById;