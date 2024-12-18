import dotenv from "dotenv";
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

const PORT = process.env.PORT || 5000;

//to parse the req.body (json)
app.use(express.json());
//Cookie Parser
app.use(cookieParser());
//For using form encoded
app.use(urlencoded({ extended: true }));

//Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on port : ${PORT}`);
  connectMongoDB();
});
