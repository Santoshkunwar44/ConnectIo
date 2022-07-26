const { findUser, updateUser, deleteUser, followUser, unfollowUser, allUser, myFriends, myFollowers, searchByName } = require("../controller/userController")

const router = require("express").Router()
// router.use(require("../middleware/authMiddleware"))
router.get("/", allUser)
router.get("/:userId/friends", myFriends)
router.get("/:userId/followers", myFollowers);
router.get("/find/:userId", findUser)
router.put("/:userId", updateUser)
router.delete("/:userId", deleteUser)
router.post("/follow/:userId", followUser)
router.post("/unfollow/:userId", unfollowUser)
router.get("/friend", searchByName)

module.exports = router