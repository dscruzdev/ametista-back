const express = require("express");
const { route } = require("express/lib/application");

let router = express.Router();

const CommentService = require("../services/CommentService");

router.post("/", CommentService.create);
router.get("/", CommentService.select);
router.get("/:id", CommentService.select1);
router.put("/:id", CommentService.update);
//router.delete("/:id", CommentService.delete)

module.exports = router;
