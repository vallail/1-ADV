import express from "express";
import { protectedRoute } from "../middleware/protectRoute.js";
import { createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectedRoute, createPost);
router.delete("/:id", protectedRoute, deletePost);
router.post("/comment/:id", protectedRoute, commentOnPost);
router.post("/likes/:id", protectedRoute, likeUnlikePost);
router.get("/allposts", protectedRoute, getAllPosts);

export default router;
