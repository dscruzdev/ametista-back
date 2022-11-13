const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const ConversationService = require("../services/conversationService");
const sendMessageConversation = require("../services/sendmessageConversationService");

router.post("/", ConversationService.newConversation);
router.get("/", ConversationService.listConversations);
router.get("/messages", ConversationService.listMessages);
router.post("/send/messenger", sendMessageConversation.sendMessageMessenger);
//router.delete("/:id", ConversationService.delete)

module.exports = router;
