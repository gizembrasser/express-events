import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateEventById = async (id, updatedEvent) => {
    const prisma = new PrismaClient();

    // categoryIds and createdBy are specifically needed for the update() method since they're foreign keys.
    // ...rest is used as a shortcut to adding all the other object keys.
    const { categoryIds, createdBy, ...rest } = updatedEvent;

    // createdBy and categoryIds are optional arguments, so updateMany() can't be used here.
    // The ternary operator ? is used to determine what value these fields will have.
    const event = await prisma.event.update({
        where: { id },
        data: {
            ...rest,
            categoryIds: categoryIds
                ? {
                    set: categoryIds.map((id) => ({ id }))
                }
                : undefined,
            createdBy: createdBy
                ? {
                    connect: { id: createdBy }
                }
                : undefined

        }
    });

    if (!event || event.count === 0) {
        throw new NotFoundError("Event", id);
    }

    return event;

};

export default updateEventById;