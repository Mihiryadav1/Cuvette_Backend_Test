import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const bookRoutes = Router();

// public routes
bookRoutes.get("/", getBooks);
bookRoutes.get("/:id", getBookById);

// protected routes
bookRoutes.post("/", authMiddleware, createBook);
bookRoutes.put("/:id", authMiddleware, updateBook);
bookRoutes.delete("/:id", authMiddleware, deleteBook);

export default bookRoutes;
