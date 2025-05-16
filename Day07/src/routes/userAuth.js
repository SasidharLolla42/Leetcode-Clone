const express = require("express");
const authRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  register,
  login,
  logout,
  adminRegister,
} = require("../controllers/userAuthent");

//Register
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", userMiddleware, logout);
authRouter.post("/admin/register", adminMiddleware, adminRegister);
//authRouter.get("/getProfile", getProfile);

//Login
//Logout
//getProfile

module.exports = authRouter;
