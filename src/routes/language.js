const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const LanguageService = require("../services/LanguageService");

router.post("/", LanguageService.create);
router.get("/", LanguageService.select);
router.put("/:id", LanguageService.update);
//router.delete("/:id", LanguageService.delete)

module.exports = router;
