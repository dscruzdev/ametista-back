const express = require("express");
const { route } = require("express/lib/application");
const { photoupload } = require("../middlewares/uploadMiddleware");
const multer = require('multer')

let router = express.Router();

const userService = require("../services/userService");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },

});
const upload = multer({ storage: storage });

router.use(upload.single('user_image'));
router.post("/", userService.create);
router.get("/", userService.select);
router.put("/:id", userService.update);
router.delete("/:id", userService.delete)

module.exports = router;
