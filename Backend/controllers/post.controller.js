import Notification from "../model/notification.model.js";
import Post from "../model/post.model.js";
import User from "../model/user.model.js"
import { v2 as cloudinary } from "cloudinary";
export const  createPost = async (req,res) =>{
    try {
        const {text} = req.body
        let {img} = req.body
        const UserId = req.user._id;
        const user = await User.findById(UserId)
        if(!user){
            return res.status(404).json({error : "User not found"})
        }
        if(!text && !img){
           return res.status(404).json({error : "Add something to your post"})
        }
        if (img){
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url
        }
        const newPost =  new Post({
           user : UserId,
           text,
           img
        })
       await newPost.save()
       res.status(201).json({message : "Post created successfully"})

    } catch (error) {
        console.log("Error in createPost" , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}

export const deletePost = async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
          return  res.status(404).json({error : "Post not found"})
        }
        if(post.user.toString() !==req.user._id.toString()){
             return  res.status(404).json({error : "You are not the owner of post"})
        }
        if(post.img){
            imgId = (post.img.split("/").pop().split(".")[0])
            await cloudinary.uploader.destroy(imgId)
        }
        await Post.findByIdAndDelete(req.params.id)
        res.status(201).json({message : "Post deleted successfully"})
    } catch (error) {
         console.log("Error in deletePost" , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}
export const commentPost = async (req,res) =>{
    try {
        const {text} = req.body
        const postId = req.params.id
        const userId = req.user._id
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({error : "Post not found"})
        }
        const comment = {user : userId , text}
        post.comments.push(comment)
        await post.save()
        res.status(200).json(post)

    } catch (error) {
        console.log("Error in commentPost" , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}

export const likeUnlikePost = async (req,res) => {
    try {
        const userId = req.user._id
        const postId = req.params.id
        const post = await Post.findById(postId)
        if(!post){
           return res.status(404).json({error : "Post not found"})
        }
        const postLiked =  post.likes.includes(userId)
        if(postLiked){
            await Post.findByIdAndUpdate(postId , {$pull : {likes : userId}} )
            await User.findByIdAndUpdate(userId, {$pull : {likedPosts : postId}})
            res.status(200).json({message: "Post unliked successfully"})
        }
        else{
            await Post.findByIdAndUpdate(postId , {$push : {likes : userId}} )
            await User.findByIdAndUpdate(userId, {$push : {likedPosts: postId}})
            const newNotification = new Notification({
              type : 'like',
              from : userId ,
              to : post.user

            })
            await newNotification.save()
            res.status(200).json({message : "Post liked successfully"})

        }
    } catch (error) {
        console.log("Error in likeUnlikePost" , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}
export const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find().sort({createdAt : -1}).populate({
            path : "user",
            select : "-password"
        }).populate({
            path : "comments.user",
            select : "-password"
        })
        if(posts.length == 0 ){
            res.status(200).json([])
        }
        res.status(200).json(posts)
    } catch (error) {
         console.log("Error in getAllPosts" , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}
export const getLikedPosts = async(req,res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({error : "User not found"})
        }
        const likedPosts = await Post.find({_id : {$in : user.likedPosts}}).populate(
            {
                path : "user",
                select : "-password"
            }
        )
        .populate(
            {
                path : "comments.user",
                select : "-password"
            }
        )
        res.status(200).json(likedPosts)

    } catch (error) {
        console.log("Error in getLikedPosts" , error.message)
        res.status(500).json({error : "Internal server error"})

    }
}
export const getFollowingPosts = async(req,res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user){
          return  res.status(404).json({error : "User not found"})
        }
        const FollowingPosts = await Post.find({user:{$in : user.following}}).sort({
            createdAt : -1
        })
        .populate({
            path : "user",
            select : "-password",
        })
        .populate({
            path : "comments.user",
            select : "-password",
        })
        res.status(200).json(FollowingPosts)
    } catch (error) {
        console.log("Error in FollowingPosts" , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}

export const getUserPosts = async(req,res) =>{
    try {
        const { username } = req.params;
        const user = await User.findOne({username})
        if(!user){
          return  res.status(404).json({error : "User not found"})
        }
        const userPosts = await Post.find({user : user._id}).sort({createdAt : -1})
        .populate(
            {
                path : "user",
                select : "-password"
            }
        )
        .populate(
            {
                path : "comments.user",
                select : "-password"
            }
        )
        res.status(200).json(userPosts)
    } catch (error) {
         console.log("Error in getUserPosts" , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}



