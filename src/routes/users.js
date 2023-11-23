import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", (req, res) => {
    const { name } = req.query;
    const users = getUsers(name);
    res.status(200).json(users);
});

router.post("/", (req, res) => {
    const { username, password, name, image } = req.body;
    const newUser = createUser(username, password, name, image);
    res.status(201).json(newUser);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);
    res.status(200).json(user);
}, notFoundErrorHandler);

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { username, password, name, image } = req.body;
    const updatedUser = updateUserById(id, username, password, name, image);
    res.status(200).json(updatedUser);
}, notFoundErrorHandler);

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deletedUserId = deleteUser(id);

    res.status(200).json({
        message: `User with id ${deletedUserId} was deleted.`
    });
}, notFoundErrorHandler);

export default router;