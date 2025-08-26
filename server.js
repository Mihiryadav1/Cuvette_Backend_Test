import express from "express";
import dotenv from "dotenv";
import userRoutes  from "./routes/user.routes.js";
import bookRoutes  from "./routes/book.routes.js";
import { connectToMongoDB } from "./config/mongoConnection.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Connecting to DB
connectToMongoDB();

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
