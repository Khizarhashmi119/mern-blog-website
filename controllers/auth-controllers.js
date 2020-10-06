const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const signup = async (req, res) => {
  //* Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  try {
    //* Get user.
    const user = await User.findOne({ email: req.body.email });

    //* Check user exist or not.
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist." }] });
    }

    //* Create new user.
    const newUser = new User(req.body);
    await newUser.save();

    //* Generate token
    const payload = {
      user: {
        id: newUser._id,
      },
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 900000,
    });

    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

const signin = async (req, res) => {
  //* Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { email, password } = req.body;

  try {
    //* Get user.
    const user = await User.findOne({ email });

    //* Check user exist or not.
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] });
    }

    //* Check user's password.
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] });
    }

    //* Generate token.
    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 900000,
    });

    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

module.exports = { signup, signin };
