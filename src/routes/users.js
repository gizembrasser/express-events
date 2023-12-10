import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { username, password, name, image } = req.body;
        const newUser = await createUser(username, password, name, image);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, image } = req.body;
        const updatedUser = await updateUserById(id, username, password, name, image);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUserId = await deleteUser(id);

        res.status(200).json({
            message: `User with id ${deletedUserId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;