const User = require('../models/seoUserModel')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async function (req, res, next) {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error('username and password are required')
    }
    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) throw new Error('User already exists');

    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    })
    await newUser.save()
    res.status(200).json(newUser)
  } catch (e) {
    console.log(e)
    return res.status(400).send(e.message)
  }
}

const login = async function (req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error("Wrong password or username!");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      throw new Error("Wrong password or username!");

    const token = jwt.sign( { id: user._id, username: user.username }, "LMeD07g@[GA=C428" );
    user.tokens=user.tokens.concat(token);
    user.save(); 
    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: false, })
      .status(200).send(info);
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
};

const logoutAll = async function (req, res) {
  try {
    req.user.tokens = []
    await req.user.save()
    res.status(200).send('successfully logged out from all devices')
  } catch (e) {
    res.status(500).json({ e })
  }
}

module.exports = { register, login, logoutAll }
