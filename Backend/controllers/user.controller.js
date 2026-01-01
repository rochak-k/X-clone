import Notification from "../model/notification.model.js";
import User from "../model/user.model.js"
export const getUserProfile = async (req,res) =>{
const {username} = req.params;
try {
    const user = await User.findOne({username}).select("-password")
    if(!user){
    return res.status(404).json({error :"User not found"})
    }
res.status(200).json(user)
} 
catch (error) {
   console.log("Error in getUserProfile", error.message)
   res.status(500).json({error : "Internal server error"}) 
}
}
export const followUnfollowUser = async(req,res) => {
    try {
        const {id} = req.params
        const usertoModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id)
        if(id === req.user._id.toString()){
        return  res.status(400).json({error : "You cannot follow or unfollow yourself"})
        }
        if(!usertoModify || !currentUser){
            return res.status(404).json({error : "User not found"})
        }
    const isFollowing = currentUser.following.includes(id);
    if(isFollowing){
        await User.findByIdAndUpdate(id, {$pull : {followers : req.user._id}})
        await User.findByIdAndUpdate(req.user._id, {$pull : {following : id}})
        res.status(200).json({message : "User unfollowed successfully"})
    }
    else{
        await User.findByIdAndUpdate(id, {$push : {followers : req.user._id}})
        await User.findByIdAndUpdate(req.user._id, {$push : {following : id}})
         //send notification
        const newNotification = new Notification({
             type : 'follow',
            from : req.user._id,
            to : usertoModify.id,
        })
        await newNotification.save()
        res.status(200).json({message : "User followed successfully"})
    }
    } 
    catch (error) {
    console.log("Error in followUnfollowUser", error.message)
    res.status(500).json({error : "Internal server error"}) 
}
    }
    export const getSuggestedUser = async (req ,res ) =>{
        
    }
