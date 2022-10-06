const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();
const whatsappController = require("../controllers/whatsappController");

// router.get("/conversation", smsController.conversation);

// router.get("/participants", smsController.participants);

// router.get("/participants/identity", smsController.participantsIdentity);

// router.get("/send", smsController.sendMessage);

//router.get("/sendConversation", smsController.sendMessageConversation); 

router.get("/sendConversation", smsController.sendMessage); // Whatsapp

module.exports = router;
