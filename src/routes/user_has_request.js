const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const User_has_RequestService = require("../services/User_has_RequestService");

router.post("/", User_has_RequestService.create);
router.get("/", User_has_RequestService.select);
router.put("/:id", User_has_RequestService.update);
//router.delete("/:id", User_has_RequestService.delete)

module.exports = router;
