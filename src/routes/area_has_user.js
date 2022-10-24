const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const Area_has_UserService = require("../services/Area_has_UserService");

router.post("/", Area_has_UserService.create);
router.get("/", Area_has_UserService.select);
router.put("/:id", Area_has_UserService.update);
//router.delete("/:id", Area_has_UserService.delete)

module.exports = router;
