const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const common = {
  type: String,
  required: true,
  trim: true
};

const UserSchema = new Schema({
  first_name: {
    ...common
  },
  last_name: {
    ...common
  },
  email: {
    ...common
  },
  password: {
    ...common
  },
  accountStatus: String,
  isActivated: Boolean,
  activateToken: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
