
const User = require("../model/User")
const bcrypt = require("bcrypt")

const findUser = async (req, res) => {

    const { userId } = req.params;

    try {



        const fetchedUser = await User.findById(userId)
        if (fetchedUser) {
            const { password, ...otherDetails } = fetchedUser._doc
            res.status(200).json({ message: otherDetails, success: true })
        } else {
            res.status(404).json({ message: "User not found", success: false })
        }


    } catch (error) {
        res.status(500).json({ message: error, success: false })

    }

}

// update the user 

const updateUser = async (req, res) => {

    const { userId } = req.params;
    const { currentUserId, currentAdminStatus, password } = req.body;

    try {

        if (userId === currentUserId || currentAdminStatus) {

            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = hashedPassword = await bcrypt.hash(password, salt)

            }

            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: req.body }, { new: true })
            res.status(200).json({ message: updatedUser, success: true })
        } else {

            res.status(400).json({ message: "You can only update your own profile", success: false })
        }

    } catch (error) {
        console.log(error)
    }
}




// delete the user 


// update the user 

const deleteUser = async (req, res) => {

    const { userId } = req.params;
    const { currentUserId, currentAdminStatus } = req.body;

    try {

        if (userId === currentUserId || currentAdminStatus) {

            User.findOneAndDelete({ _id: userId })
            res.status(200).json({ message: 'successfully deleted the account', success: true })
        } else {
            res.status(400).json({ message: "You can only delete your own profile", success: false })
        }

    } catch (error) {
        res.status(500).json({ message: error, success: false })
        console.log(error)
    }
}


// follow the user 


const followUser = async (req, res) => {


    const { userId } = req.params
    const { currentUserId } = req.body
    if (userId === currentUserId) {


        return res.status(403).json({ message: "action Forbidden" })
    } else {
        try {
            const nextUser = await User.findById(userId)
            const currentUser = await User.findById(currentUserId)



            if (!currentUser.followings.includes(userId)) {
                await currentUser.updateOne({ $push: { followings: userId } })
                await nextUser.updateOne({ $push: { followers: currentUserId } })

                res.status(200).json({ message: "You followed the user successfully", success: true })
            } else {
                return res.status(401).json({ message: "You have already followed the user ", success: false })
            }

        } catch (error) {
            res.status(500).json({ message: error, success: false })
        }
    }

}



// unfollow the user 


const unfollowUser = async (req, res) => {


    const { userId } = req.params
    const { currentUserId } = req.body
    if (userId === currentUserId) {


        return res.status(403).json({ message: "action Forbidden" })
    } else {
        try {
            const nextUser = await User.findById(userId)
            const currentUser = await User.findById(currentUserId)


            if (currentUser.followings.includes(userId)) {
                await currentUser.updateOne({ $pull: { followings: userId } })
                await nextUser.updateOne({ $pull: { followers: currentUserId } })

                res.status(200).json({ message: "You unfollowed the user successfully", success: true })
            } else {
                return res.status(401).json({ message: "You have not  followed the user yet ", success: false })
            }

        } catch (error) {
            res.status(500).json({ message: error, success: false })
        }
    }

}






// all users = 

const allUser = async (req, res) => {

    try {
        const fetchedUser = await User.find()
        const mapped = fetchedUser.map((user) => {
            const { password, ...others } = user._doc
            return others
        })


        res.status(200).json({ message: mapped, success: true })

    } catch (error) {
        res.status(500).json({ message: error, success: false })

    }

}


const myFriends = async (req, res) => {
    const { userId } = req.params

    console.log(userId, "th userid ")

    if (!userId) {
        return res.status(401).json({ message: "You have not provided the User credentials", success: false })
    }
    try {


        const theFriends = await User.find({ _id: userId }, { followings: 1, _id: 0 }).populate("followings")
        res.status(200).json({ message: theFriends, success: true })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error, success: false })
    }

}

const myFollowers = async (req, res) => {

    const { userId } = req.params

    if (!userId) {
        return res.status(401).json({ message: "You have not provided the User credentials", success: false })
    }
    try {


        const theFriends = await User.find({ _id: userId }, { followers: 1, _id: 0 }).populate("followers")
        res.status(200).json({ message: theFriends, success: true })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error, success: false })
    }

}

// search the users by their names 



const searchByName = async (req, res) => {


    try {


        const keyword = req.query.search ? {
            $or: [
                { username: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {}

        const fetchedUser = await User.find(keyword);
        console.log(fetchedUser)

        if (fetchedUser.length > 0) {

            res.status(200).json({ message: fetchedUser, success: true })
        } else {

            res.status(404).json({ message: "Found no users with this username " });
        }




    } catch (error) {


        console.log(error)
        res.status(500).json({ message: error, success: false })
    }
}



module.exports = { findUser, updateUser, deleteUser, followUser, unfollowUser, allUser, myFriends, myFollowers, searchByName }