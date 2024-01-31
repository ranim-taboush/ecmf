const jwt = require("jsonwebtoken");
const User = require("../models/seoUserModel");

const auth = (req, res, next) => {
  try {
    const token = req.headers?.accesstoken || req.headers?.accessToken || null
    
    if (!token || token === null) return res.status(401).send("You are not authenticated!");

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
