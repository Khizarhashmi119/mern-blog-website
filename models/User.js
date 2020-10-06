const crypto = require("crypto");

const mongoose = require("mongoose");
const uuid = require("uuid");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 32,
      trim: true,
    },
    encryPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    saltRound: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.salt = uuid.v4();
  this.encryPassword = this.encryptPassword(password);
});

userSchema.methods = {
  authenticate: function (password) {
    return this.encryPassword === this.encryptPassword(password);
  },

  encryptPassword: function (password) {
    for (let i = 0; i < this.saltRound; i++) {
      password = crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    }

    return password;
  },
};

module.exports = User = mongoose.model("User", userSchema);
