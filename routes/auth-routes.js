const express = require("express");
const { body } = require("express-validator");

const routers = express.Router();

const { signup, signin } = require("../controllers/auth-controllers");

//* @route  POST /api/auth/signup
//* @desc   User registration route.
//* @access public
routers.post(
  "/signup",
  [
    body("name", "Please enter your name.").notEmpty(),
    body("email", "Please enter valid email.").isEmail(),
    body("password", "Must be atleast 6 character.").isLength({ min: 6 }),
  ],
  signup
);

//* @route  POST /api/auth/signin
//* @desc   User login route.
//* @access public
routers.post(
  "/signin",
  [
    body("email", "Please enter valid email.").isEmail(),
    body("password", "Please enter password.").notEmpty(),
  ],
  signin
);

module.exports = routers;
