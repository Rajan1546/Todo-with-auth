const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User wih given email already exist" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashedPassword , cpassword: hashedPassword}).save();
    res.status(201).send({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "User Internal server error" });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "All User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: " All Internal server error" });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send({ message: "Update User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Update Internal server error" });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Delete User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Delete Internal server error" });
  }
});


module.exports = router;
