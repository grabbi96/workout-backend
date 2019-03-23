const validator = require("validator");
const isEmpty = require("./is-empty");

const registerInputValidation = data => {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirmation = !isEmpty(data.password_confirmation)
    ? data.password_confirmation
    : "";

  if (!validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "first Name must be between 2 and 30 characters";
  }
  if (!validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = "first Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(data.password_confirmation)) {
    errors.password_confirmation = "Confirmation Password field is required";
  }
  if (!validator.equals(data.password, data.password_confirmation)) {
    errors.password_confirmation = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = registerInputValidation;
