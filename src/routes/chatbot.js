const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const chatbotService = require("../services/chatbotService");

router.post("/findclient", chatbotService.findclient);
router.post("/newclient", chatbotService.newclient);
router.post("/newrequest", chatbotService.newrequest);
router.post("/checkcall", chatbotService.checkcall);
router.post("/getoptions", chatbotService.getoptions);
router.post("/checksubject", chatbotService.checksubject);
router.post("/endrequest", chatbotService.endrequest);
//router.delete("/:id", AreaService.delete)

module.exports = router;
