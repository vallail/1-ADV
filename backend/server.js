import dotenv from "dotenv";
import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//to parse the req.body (json)
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on port : ${PORT}`);
  connectMongoDB();
});
