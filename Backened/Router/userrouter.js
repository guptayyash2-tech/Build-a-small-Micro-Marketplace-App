const express = require('express');
const userrouter = express.Router();
const { register, login, getProfile } = require('../Controller/Usercontoller');
const protect = require('../middlewear/usermiddle');


userrouter.post("/register", register);
userrouter.post("/login", login);
userrouter.get("/profile",protect,getProfile)

module.exports = userrouter;