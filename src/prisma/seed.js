import { PrismaClient } from "@prisma/client";
import userData from "../data/users.json" assert { type: "json" };
import categoryData from "../data/categories.json" assert { type: "json" };
import eventData from "../data/events.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
    const { users } = userData;
    const { categories } = categoryData;
    const { events } = eventData;

    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        });
    }
    for (const category of categories) {
        await prisma.category.upsert({
            where: { id: category.id },
            update: {},
            create: category
        });
    }
    for (const event of events) {
        await prisma.event.upsert({
            where: { id: event.id },
            update: {},
            create: {
                id: event.id,
                title: event.title,
                description: event.description,
                image: event.image,
                location: event.location,
                startTime: event.startTime,
                endTime: event.endTime,
                categoryIds: {
                    // In the schema, a many-to-many relationship was established between Events and Categories.
                    // connect specifies which fields are foreign keys, e.g. the categoryIds.
                    connect: event.categoryIds.map((id) => ({ id }))
                },
                createdBy: {
                    // createdBy holds a user.id value, connect specifies the foreign key.
                    connect: { id: event.createdBy }
                }
            }
        });
    }
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