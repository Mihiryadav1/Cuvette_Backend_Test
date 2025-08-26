import { Router } from "express";

import { registerUser, loginUser } from "../controllers/userController.js";

const userRoutes = Router();

//public routes
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

export default userRoutes
