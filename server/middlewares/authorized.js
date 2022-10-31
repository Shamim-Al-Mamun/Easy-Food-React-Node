const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");
const authorized = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const token = headerToken.split(" ")[1];
      const verified = jwt.verify(token, JWT_SECRET);
      if (verified) {
        const { fullname, id } = verified;
        req.fullname = fullname;
        req.userId = id;
        next();
      } else {
        return res.status(400).json("Please add a valid token");
      }
    } else {
      return res.status(400).json({ msg: "Unauthorized User" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

module.exports = authorized;
