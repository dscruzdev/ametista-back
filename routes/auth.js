const { request } = require("express");
const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const authService = require('../services/authService.js');

router.post("/", authService.login);
//router.get("/", authService.recovery);
//router.delete("/:id", clientService.delete)

module.exports = router;