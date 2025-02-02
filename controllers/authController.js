// Import required packages
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);
const crypto = require("crypto");

// Import models
const User = require(`../models/userModel`);
// Import nodemailer transporter
const transporter = require(`../utils/mail`);
const { Op } = require(`sequelize`);

// Controller for register
exports.signUp = async (req, res, next) => {
  try {
    // Get credentials and check if there
    const email = req.body.email.toString();
    const username = req.body.username.toString();
    const password = req.body.password.toString();
    const passwordConfirmation = req.body.passwordConfirmation.toString();
    if (!email || !password || !passwordConfirmation || !username) {
      return next(new Error(`Please enter all the credentials`));
    }
    if (!(password === passwordConfirmation)) {
      return next(new Error(`Password and confirmation does not match`));
    }
    const newUser = await User.create({
      email: email,
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation,
    });
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: `2 days`,
      }
    );
    res.status(200).json({
      status: `success`,
      token: token,
      data: {
        newUser: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    // Get the inputs and check if exist
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return next(new Error(`Missing credentials`));
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new Error(`username or password is not correct`));
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );

    console.log(user);
    res.status(200).json({
      status: `success`,
      token: token,
      data: {
        // token: token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token does no longer exist.",
      });
    }

    // Check if user changed password after the token was issued
    if (currentUser.checkPasswordChangedAfterToken(decoded.iat)) {
      return res.status(401).json({
        status: "fail",
        message: "User recently changed password! Please log in again.",
      });
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized! Invalid token.",
      errmessage: err.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!(user.role === `admin`)) {
      return next(new Error(`Only admins can access this route`));
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.sendPasswordToken = async (req, res, next) => {
  try {
    // Get email and User based on email if not return error
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return next(
        new Error(`Can not find user with this email.Please give correct email`)
      );
    }
    // Create passwordResetToken 32 bytes random string
    const passwordToken = crypto.randomBytes(32).toString(`hex`);
    const passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // Hash the token with user.hashPasswordResetToken() function and set user's fields then save user
    const hashedToken = user.hashPasswordResetToken(passwordToken);
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = passwordResetExpires;
    user.save();

    // Send token to user via mail
    const info = await transporter.sendMail({
      from: `libgram@support.com`,
      to: email,
      subject: `Password Reset`,
      text: `Here is your password reset token ${passwordToken}.It will expires in 10 min.Please ignore if you don't want reset your password`,
    });

    res.status(200).json({
      status: `success`,
      message: `Password reset token sended to your mail`,
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.body;
    const newPassword = req.body.newPassword.toString();
    const passwordConfirmation = req.body.passwordConfirmation.toString();

    if (!token || !newPassword || !passwordConfirmation) {
      return next(new Error(`Missing credentials`));
    }
    if (!(newPassword === passwordConfirmation)) {
      return next(
        new Error(`Password and password confirmation does not match!`)
      );
    }

    const hashedToken = crypto.createHash(`sha256`).update(token).digest(`hex`);

    const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { [Op.gt]: Date.now() }, // Sequelize greater than operator
      },
    });

    if (!user) {
      return next(new Error(`Token is invalid or has expired.`));
    }

    await user.update({
      passwordConfirmation: passwordConfirmation,
      password: newPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    });
    res.status(200).json({
      status: `success`,
      message: `Password successfuly changed`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};
