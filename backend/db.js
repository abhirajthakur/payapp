const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("./config");

mongoose.connect(MONGODB_CONNECTION_STRING);

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: Number,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
