const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const User_has_LanguageService = require("../services/User_has_LanguageService");

router.post("/", User_has_LanguageService.create);
router.get("/", User_has_LanguageService.select);
router.put("/:id", User_has_LanguageService.update);
//router.delete("/:id", User_has_LanguageService.delete)

module.exports = router;
