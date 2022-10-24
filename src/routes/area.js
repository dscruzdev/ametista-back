const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const AreaService = require("../services/AreaService");

router.post("/", AreaService.create);
router.get("/", AreaService.select);
router.put("/:id", AreaService.update);
//router.delete("/:id", AreaService.delete)

module.exports = router;
