import { PrismaClient } from "@prisma/client";
import userData from "../../data/users.json" assert { type: "json" };
import categoryData from "../../data/categories.json" assert { type: "json" };
import eventData from "../../data/events.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
