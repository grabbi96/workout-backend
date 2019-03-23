const router = require("express").Router();
const { addContribution } = require("../controller/contributionController");
const authenticate = require("../passport/authenticateMiddleware");
router.post("/contributions", authenticate, addContribution);

module.exports = router;
