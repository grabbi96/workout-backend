const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const authRoute = require("./route/AuthRoute");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
require("./passport/jwStrategy")(passport);

app.get("/", (req, res) => {
  res.json({ name: "golam rabbi" });
});

app.use("/api/auth", authRoute);

app.use("/api/members", require("./route/ContributionRoute"));

mongoose
  .connect("mongodb://localhost:27017/workout", { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
  });
app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
