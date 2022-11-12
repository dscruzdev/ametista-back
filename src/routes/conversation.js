const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const ConversationService = require("../services/conversationService");

router.post("/", ConversationService.newConversation);
router.get("/", ConversationService.listConversations);
router.get("/messages", ConversationService.listMessages);
//router.delete("/:id", ConversationService.delete)

module.exports = router;
