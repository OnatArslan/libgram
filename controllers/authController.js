const jwt = require(`jsonwebtoken`);
const userModel = require(`../models/userModel`);
const bcrypt = require(`bcrypt`);

// Controller for register
exports.signIn = async (req, res, next) => {
  try {
    // Get credentials and check if there
    const email = req.body.email.toString();
    const username = req.body.username.toString();
    const password = req.body.password.toString();
    const passwordConfirmation = req.body.passwordConfirmation.toString();
    if (!email || !password || !passwordConfirmation || !username) {
      return next(new Error(`Please enter all the credentials`));
    }
    const newUser = await userModel.create({
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
      data: {
        token: token,
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
