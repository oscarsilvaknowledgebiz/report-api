require("dotenv").config();
const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/", authController.autenticarUsuario);

module.exports = router;