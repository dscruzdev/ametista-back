const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const userService = require("../services/userService");

router.post("/", userService.create);
router.get("/", userService.select);
// router.put("/:id", userService.update);
router.delete("/:id", userService.delete)

module.exports = router;
