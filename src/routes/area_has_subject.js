const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const Area_has_SubjectService = require("../services/Area_has_SubjectService");

router.post("/", Area_has_SubjectService.create);
router.get("/", Area_has_SubjectService.select);
router.put("/:id", Area_has_SubjectService.update);
//router.delete("/:id", Area_has_SubjectService.delete)

module.exports = router;
