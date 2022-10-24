const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const LogStatusRequest_has_RequestService = require("../services/LogStatusRequest_has_RequestService");

router.post("/", LogStatusRequest_has_RequestService.create);
router.get("/", LogStatusRequest_has_RequestService.select);
router.put("/:id", LogStatusRequest_has_RequestService.update);
//router.delete("/:id", LogStatusRequest_has_RequestService.delete)

module.exports = router;
