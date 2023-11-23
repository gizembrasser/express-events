import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";

const router = express.Router();

router.get("/", (req, res) => {
    const { name } = req.query;
    const users = getUsers(name);
    res.status(200).json(users);
});

export default router;