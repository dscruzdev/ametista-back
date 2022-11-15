const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { route } = require("express/lib/application");
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWTTOKEN;

let router = express.Router();

const authService = require('../services/authService.js');




router.post("/", authService.login);
router.use(authMiddleware.verify);
router.get("/", authService.info);
//router.delete("/:id", clientService.delete)

module.exports = router;