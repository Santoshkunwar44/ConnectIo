const { savePost, getPost, updatePost, deletePost, likePost, getTimelinePost, singleUserPost } = require("../controller/postController")

const router = require("express").Router()


router.post("/", savePost)
router.get("/:postId", getPost)
router.put("/:postId", updatePost)
router.delete("/:postId", deletePost)
router.put("/:postId/like", likePost)
router.get("/:userId/timeline", getTimelinePost)
router.get("/find/:userId", singleUserPost)


module.exports = router