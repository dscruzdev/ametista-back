const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const LogStatusRequestService = require("../services/LogStatusRequestService");

router.post("/", LogStatusRequestService.create);
router.get("/", LogStatusRequestService.select);
router.put("/:id", LogStatusRequestService.update);
//router.delete("/:id", LogStatusRequestService.delete)

module.exports = router;
