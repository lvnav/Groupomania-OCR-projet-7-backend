const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const ConversationController = require("../controllers/ConversationController");

router.get("/getConversationById", auth, ConversationController.getConversationById);
router.get("/getAllConvByUserId", auth, ConversationController.getAllConvByUserId);
router.get("/getConversationByUserAndFriendId", ConversationController.getConversationByUserAndFriendId);
router.post("/createConversation", auth, ConversationController.createConversation);
router.post("/changeConversationPicture", auth, multer, ConversationController.changeConversationPicture);
router.put("/leaveConversation", auth, ConversationController.leaveConversation);
router.post("/addUserToConversation", ConversationController.addUserToConversation);

// router.get("/byUserAndFriend", ConversationController.getConversationByUserAndFriendId);
module.exports = router;
