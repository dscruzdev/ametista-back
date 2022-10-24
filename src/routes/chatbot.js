const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const ClientService = require("../services/ClientService");

router.post("/", ClientService.select);
router.post("/create", ClientService.create);
//router.delete("/:id", AreaService.delete)

module.exports = router;
