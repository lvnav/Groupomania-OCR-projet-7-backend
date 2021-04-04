const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const FeedPostController = require("../Controllers/FeedPostController");

router.get("/getFeedPost", auth, FeedPostController.getFeedPost);
router.get("/comments", FeedPostController.getComments);
router.post("/createFeedPost", FeedPostController.createFeedPost);
router.post("/newComment", FeedPostController.newComment);
router.delete("/deleteComment", FeedPostController.deleteComment);

module.exports = router;
