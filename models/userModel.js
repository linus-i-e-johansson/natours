const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "A user must have a name"],
  },
  email: {
    type: "String",
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  photo: String,
  password: {
    type: "String",
    required: [true, "please enter a password"],
    minlength: 8,
    select:false
  },
  passwordConfirm: {
    type: "String",
    required: [true, "please confirm your password"],
    validate: {
      // This only works on SAVE!
      validator: function (el) {
        return el === this.password; // pass123 === pass123
      },
      message: "Passwords do not match",
    },
  },
 passwordChangedAt: Date
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was modified
  if (!this.isModified("password")) {
    return next();
  }
  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete password confirm field
  this.passwordConfirm = undefined;
  next();
});
// checks to se if the user password provided is the same as the user password stored in the DB.
// returns true if it is and false if not.
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.passwordChangedAfter = function (JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000,10);

    return JWTTimestamp < changedTimestamp; // 100 < 200
  }

  return false;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
