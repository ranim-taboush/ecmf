const express = require("express");
const { register, login, logoutAll } = require("../controllers/userController");
const auth = require('../middleware/auth');


const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.patch("/logout", auth, logoutAll);

module.exports = router;
