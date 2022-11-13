const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const requestService = require("../services/requestService");

router.post("/",requestService.create);
router.put("/",requestService.update);
router.get("/",requestService.select);

module.exports = router;