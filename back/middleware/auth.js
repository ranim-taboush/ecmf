const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = (req, res, next) => {
  try {
    if (!req.headers?.accessToken) return res.status(401).send("Wrong token!" + token);
    const token = req.headers?.accessToken
    
    if (!token) return res.status(401).send("You are not authenticated!");

    jwt.verify(token, "LMeD07g@[GA=C428", async (err, obj) => {
      if (err) return res.status(403).send("Token is not valid!");

      const user = await User.findById(obj.id)
      if (!user) return res.status(404).send("Token is not valid!");
      req.user = user;
      req.token = token;

      next();
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = auth;
