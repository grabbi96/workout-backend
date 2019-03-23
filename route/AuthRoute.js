const router = require("express").Router();
const {
  register,
  mailTesting,
  login,
  me
} = require("../controller/authContrroller");
const authenticate = require("../passport/authenticateMiddleware");
router.post("/register", register);
router.post("/login", login);
router.post("/me", authenticate, me);
router.post("/mail", mailTesting);

module.exports = router;
