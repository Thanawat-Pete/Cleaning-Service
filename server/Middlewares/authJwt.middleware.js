const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const UserModel = require('../Models/user.js');
const Type = require('../Models/type.js');

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ message: "Token is missing" });
  }
  jwt.verify(token, secret, async (err, decoded) => {
    if (err) return res.status(403).send({ message: "Access Forbidden" });
    req.username = decoded.username;
    req.authorId = decoded.id;
    // Populate user type
    const user = await UserModel.findById(decoded.id).populate('type');
    if (!user) return res.status(401).send({ message: "User not found" });
    req.userType = user.type.name;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ message: "Token is missing" });
  }
  jwt.verify(token, secret, async (err, decoded) => {
    if (err) return res.status(403).send({ message: "Access Forbidden" });
    req.username = decoded.username;
    req.authorId = decoded.id;
    // Check if user is admin
    const user = await UserModel.findById(decoded.id).populate('type');
    if (!user || !user.type || user.type.name !== 'admin') {
      return res.status(403).send({ message: "Admin access required" });
    }
    next();
  });
};

const authJWT = {
  verifyToken,
  verifyAdmin,
};

module.exports = authJWT;