const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  pasportId: { type: Number, unique: true },
  credit: {
    type: Number,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

//console.log(userSchema);

const User = mongoose.model("User", userSchema);
User.init();
module.exports = User;
