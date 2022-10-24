const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();
const receivemessageServices = require("../services/receivemessageService");

router.post("/sms", receivemessageServices.receiveMessageSMS); // SMS
router.post("/whatsapp", receivemessageServices.receiveMessageWhatsapp); //Whatsapp
// router.post("/email", receivemessageServices.receiveMessageEmail); //email
// router.post("/messenger", receivemessageServices.receiveMessageMessenger); //Messenger


module.exports = router;
