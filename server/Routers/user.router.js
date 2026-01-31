const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/user.controller.js");

//loaclhost:5000/api/v1/user/register
router.post("/register", UserController.registerUser);
//loaclhost:5000/api/v1/user/login
router.post("/login", UserController.loginUser);

module.exports = router;