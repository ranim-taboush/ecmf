const express = require("express");
const { register, login, logoutAll } = require("../controllers/seoUserController");
const auth = require('../middleware/auth');
const seoAuth = require('../middleware/seoAuth');

const router = express.Router();

router.post("/seo/signup", auth, register);
router.post("/seo/login", login);
router.patch("/seo/logout", seoAuth, logoutAll);

module.exports = router;
