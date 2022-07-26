const { default: mongoose } = require("mongoose")
const Post = require("../model/Post")
const User = require("../model/User")


// saving the post 
const savePost = async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savedPost = await (await newPost.save()).populate("userId")
        res.status(200).json({ message: savedPost, success: true })

    } catch (error) {
        res.status(500).json({ message: error, success: false })
    }

}
// geting  the single post 
const getPost = async (req, res) => {

    const { postId } = req.params

    try {
        const fetchedPost = await Post.findById(postId).populate("userId")
        res.status(200).json({ message: fetchedPost, success: true })

    } catch (error) {
        res.status(500).json({ message: error, success: false })
    }

}
// saving the post 
const updatePost = async (req, res) => {

    const { postId } = req.params;
    const { userId } = req.body

    try {

        const UserPost = await Post.findById(postId);
        console.log(UserPost)
        console.log(userId)

        if (UserPost.userId.toString() === userId) {
            await UserPost.updateOne({ $set: req.body })
            res.status(200).json({ message: "Post updated successfully", success: true })


        } else {
            res.status(403).json({ message: "You can only update your own post" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error, success: false })
    }

}


// delete the post 

const deletePost = async (req, res) => {

    const { postId } = req.params
    const { userId } = req.body
    try {
        const thePost = await Post.findById(postId)

        if (userId === thePost.userId.toString()) {
            await thePost.deleteOne();
            res.status(200).json({ message: "You deleted the post successfully", success: true })


        } else {
            res.status(403).json({ message: "Action Forbidden", success: false })
        }



    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error, success: false })

    }
}


// like // dislike the post 


const likePost = async (req, res) => {

    const { postId } = req.params;
    const { userId } = req.body
    console.log(userId)

    try {
        const thePost = await Post.findById(postId)
        console.log(thePost)
        if (!thePost.likes.includes(userId)) {
            await thePost.updateOne({ $push: { likes: userId } })
            res.status(200).json({ message: "Post liked Successfully", success: true })
        } else {
            await thePost.updateOne({ $pull: { likes: userId } })
            res.status(200).json({ message: "Post unliked Successfully", success: true })
        }


    } catch (error) {

    }
}




// timeline 

const getTimelinePost = async (req, res) => {


    const { userId } = req.params
    console.log(userId)

    try {
        const currentUserPost = await Post.find({ userId })
        const followingPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    foreignField: "userId",
                    localField: "followings",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])


        res.status(200).json({ message: currentUserPost.concat(...followingPosts[0].followingPosts), success: true })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error, success: false })
    }

}

//  get all the post of the single user 

const singleUserPost = async (req, res) => {

    const userId = req.params.userId;
    try {

        const thePost = await Post.find({ userId }).populate("userId")
        res.status(200).json({ message: thePost, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error, success: false })
    }
}


module.exports = { savePost, getPost, updatePost, deletePost, likePost, getTimelinePost, singleUserPost }