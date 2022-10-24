const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const LogStatusUser_has_UserService = require("../services/LogStatusUser_has_UserService");

router.post("/", LogStatusUser_has_UserService.create);
router.get("/", LogStatusUser_has_UserService.select);
router.put("/:id", LogStatusUser_has_UserService.update);
//router.delete("/:id", LogStatusUser_has_UserService.delete)

module.exports = router;
