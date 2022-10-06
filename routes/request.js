const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();
const requestController = require("../controllers/requestController");

router.post("/", requestController.create);

module.exports = router;
