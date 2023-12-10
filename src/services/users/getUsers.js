import { PrismaClient } from "@prisma/client";

const getUsers = async () => {
    const prisma = new PrismaClient();
    // No filter provided for .findMany() so it returns all users.
    const users = await prisma.user.findMany();

    return users;
};

export default getUsers;