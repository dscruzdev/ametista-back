const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { route } = require("express/lib/application");
const SECRET = process.env.JWTTOKEN;

let router = express.Router();

const authService = require('../services/authService.js');

function verifyJWT(req,res,next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end();
        
        req.cpf = decoded.cpf;
        console.log("Passou por aqui");
        next();
    })
}

router.post("/", authService.login);
router.get("/", authService.info, verifyJWT);
//router.delete("/:id", clientService.delete)

module.exports = router;