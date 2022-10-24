const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const mArea_has_Subject = require("../models/mArea_has_Subject");
const mArea = require("../models/mArea");
const Comment = require("../models/mComment");
const LogStatusRequest_has_Request = require("../models/mLogStatusRequest_has_Request");
const LogStatusUser_has_User = require("../models/mLogStatusUser_has_User");
const User_has_Language = require("../models/mUser_has_Language");
const User_has_Request = require("../models/mUser_has_Request");

const clientService = require("../services/clientService");

router.post("/", clientService.create);
router.get("/", clientService.select);
router.put("/:id", clientService.update);
//router.delete("/:id", clientService.delete)

module.exports = router;
