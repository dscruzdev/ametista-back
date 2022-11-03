const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const chatbotService = require("../services/chatbotService");

router.post("/findclient", chatbotService.findclient);
router.post("/newclient", chatbotService.newclient);
router.post("/newrequest", chatbotService.newrequest);
//router.delete("/:id", AreaService.delete)

module.exports = router;
