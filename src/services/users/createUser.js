import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createUser = async (username, password, name, image) => {
    const newUser = {
        username,
        password,
        name,
        image
    };

    const prisma = new PrismaClient();
    const user = await prisma.user.create({
        data: newUser,
    });

    return user;
};

export default createUser;