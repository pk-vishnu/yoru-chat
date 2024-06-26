import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser()); //this is used to access the cookies to verify the user

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  dbConnect();
  console.log("Server is running on port 8000");
});
