const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const SubjectService = require("../services/SubjectService");

router.post("/", SubjectService.create);
router.get("/", SubjectService.select);
router.put("/:id", SubjectService.update);
router.delete("/:id", SubjectService.delete)

module.exports = router;
