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
           return res.status(404).json({error : "Add something to your post man"})
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
