const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const ConversationService = require("../services/conversationService");
const sendMessageConversation = require("../services/sendmessageConversationService");

router.post("/", ConversationService.newConversation);
router.get("/", ConversationService.listConversations);
router.get("/messages/:id", ConversationService.listMessages);
router.post("/send", ConversationService.sendMessage);
router.delete("/:id", ConversationService.delete);
router.post("/receivemessage", ConversationService.receivemessage);
router.get("/receiveemail", ConversationService.receiveEmail);

module.exports = router;
