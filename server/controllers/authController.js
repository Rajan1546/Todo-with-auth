const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const login = async (req, res) => {
  try {
    const { errors } = validationResult(req);

    if (errors && errors.length > 0) {
      console.log(errors);
      return res.status(400).json({ errors: errors });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(401).send({ message: "Invalid Email and Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { login };
