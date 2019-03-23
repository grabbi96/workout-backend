const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const registerInputValidation = require("../validator/registationValidator");
const validateLoginInput = require("../validator/loginValidator");
const User = require("../models/userModel");
const { catchError } = require("../utils//error");
const verificationTemplate = require("../generateEmailTemplate/verificationTemplate");
const generateEmailOption = require("../utils/generateEmailOption");
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);
module.exports = {
  async register(req, res) {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmation_password
    } = req.body;
    let { errors, isValid } = registerInputValidation(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const findUser = await User.findOne({ email: email });
      if (findUser) {
        errors.email = "email all ready exits";
        return res.status(400).json({
          message: "email has been already taken",
          errors: errors
        });
      }
      const activeToken = jwt.sign({ first_name, email }, "SECRET", {
        expiresIn: "1d"
      });

      bcrypt.hash(password, 11, async (err, hash) => {
        if (err) {
          console.log(err);
          catchError(res, err);
        }
        let user = new User({
          first_name,
          last_name,
          email,
          password: hash,
          accountStatus: "PENDING",
          isActivated: false,
          activateToken: activeToken
        });
        const newUser = await user.save();
        if (newUser) {
          return res.status(200).json({
            message: "account created successfully"
          });
        }
        // let accountLink = `http://localhost//api/auth/activateaccount/${
        //   newUser.activateToken
        // }`;
        // let template = verificationTemplate({
        //   name: `${newUser.firstName} ${newUser.lastName}`,
        //   link: accountLink
        // });
        // let mailOption = generateEmailOption({
        //   to: newUser.email,
        //   subject: "your account activated",
        //   template: template
        // });
        // transporter.sendMail(mailOption, (err, info) => {
        //   if (err) return catchError(err);
        //   res.status(201).json({
        //     message: "user created successfully",
        //     activateLink: `http:/localhost:4000/api/users/activateaccount/${
        //       newUser.activateToken
        //     }`,
        //     user: {
        //       _id: newUser._id,
        //       name: newUser.name,
        //       email: newUser.email
        //     }
        //   });
        // });
      });
    } catch (err) {
      return catchError(res, err);
    }
  },
  async login(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      errors.email = "email don't found";
      return res.status(400).json(errors);
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (checkPassword) {
      let payload = {
        id: findUser._id,
        name: `${findUser.firstName}  ${findUser.lastName}`
      };
      let token = jwt.sign(payload, "SECRET", { expiresIn: "1h" });

      res.json({
        success: true,
        access_token: token,
        token_type: "Bearer "
      });
    } else {
      errors.password = " password incorrect";
      res.json({ errors });
    }
  },
  async me(req, res) {
    try {
      let user = await User.findOne({ email: req.user.email });

      res.status(200).json(user);
    } catch (err) {}
  },
  async mailTesting(req, res) {
    try {
      const mail = await transporter.sendMail({
        to: "orloveo15@gmail.com",
        from: "shop96@gmail.com",
        subject: "signup",
        html: "<h2>you successfully signed up!</h2>"
      });
      console.log(mail, sendGridTransport);
      if (mail) {
        res.json({
          name: "golam rabb"
        });
      }
    } catch (err) {
      res.json({
        err
      });
    }
  }
};
