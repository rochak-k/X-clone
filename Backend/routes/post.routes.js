import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost, deletePost, commentPost , likeUnlikePost ,getAllPosts, getLikedPosts, getFollowingPosts,getUserPosts } from "../controllers/post.controller.js";
const router = express.Router();
router.get("/all",protectRoute , getAllPosts)
router.get("/likedPosts/:id",protectRoute , getLikedPosts)
router.get("/followingPosts",protectRoute , getFollowingPosts)
router.get("/userPosts/:username", protectRoute , getUserPosts)
router.post("/create", protectRoute , createPost )
router.post("/like/:id", protectRoute , likeUnlikePost )
router.post("/comment/:id", protectRoute , commentPost )
router.delete("/delete/:id", protectRoute , deletePost )
export default router; 
