const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const clientService = require("../services/clientService");

router.post("/", clientService.create);
router.get("/", clientService.select);
router.put("/:id", clientService.update);
//router.delete("/:id", clientService.delete)

module.exports = router;
