const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const bcrypt = require("bcrypt");
require("dotenv").config();

const router = Router();

const signupSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().min(8).optional(),
});

const secret = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(411).json({ message: "User already exixts" });
  }
  const { firstName, lastName, email, password } = req.body;

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  if (!hash) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash: hash,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, secret);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(411).json({ message: "Error while logging in" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(411).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    secret,
  );

  res.json({ token: token });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success, data } = updateSchema.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }

  const user = await User.findById(req.userId);
  if (data.firstName) {
    user.firstName = data.firstName;
  }
  if (data.lastName) {
    user.lastName = data.lastName;
  }
  if (data.password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(data.password, saltRounds);
    if (!hash) {
      return res.status(500).json({ message: "Internal server error" });
    }
    user.passwordHash = hash;
  }

  await user.save();

  res.json({ message: "Updated successfully" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  res.json({
    users: users
      .filter((user) => user._id != req.userId)
      .map((user) => ({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-passwordHash -__v");
  res.json({ user });
});

module.exports = router;
