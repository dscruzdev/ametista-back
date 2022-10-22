const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();
const sendmessageServices = require("../services/sendmessageService");

router.post("/sms", sendmessageServices.sendMessageSMS); // SMS
router.post("/whatsapp", sendmessageServices.sendMessageWhatsapp); //Whatsapp
router.post("/email", sendmessageServices.sendMessageEmail); //email
router.post("/messenger", sendmessageServices.sendMessageMessenger); //Messenger


module.exports = router;
