import express from "express";
import getCategories from "../services/categories/getCategories.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import createCategory from "../services/categories/createCategory.js";
import updateCategoryById from "../services/categories/updateCategoryById.js";
import deleteCategory from "../services/categories/deleteCategory.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { name } = req.body;
        const newCategory = await createCategory(name);

        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);

        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await updateCategoryById(id, { name });

        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCategoryId = await deleteCategory(id);

        res.status(200).json({
            message: `Category with id ${deletedCategoryId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;