const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const logStatusUserService = require("../services/logStatusUserService");

router.post("/", logStatusUserService.create);
router.get("/", logStatusUserService.select);
router.put("/:id", logStatusUserService.update);
//router.delete("/:id", logStatusUserService.delete)

module.exports = router;
