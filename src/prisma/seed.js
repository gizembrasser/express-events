import { PrismaClient } from "@prisma/client";
import userData from "../data/users.json" assert { type: "json" };
import categoryData from "../data/categories.json" assert { type: "json" };
import eventData from "../data/events.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
    const { users } = userData;
    const { categories } = categoryData;

    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        })
    };
    for (const category of categories) {
        await prisma.category.upsert({
            where: { id: category.id },
            update: {},
            create: category
        })
    };
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });