const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();
const listmessageServices = require("../services/listmessageService");

router.post("/sms", listmessageServices.listMessageSMS); // SMS
router.post("/whatsapp", listmessageServices.listMessageWhatsapp); //Whatsapp
router.post("/email", listmessageServices.listMessageEmail); //email
router.post("/messenger", listmessageServices.listMessageMessenger); //Messenger


module.exports = router;
