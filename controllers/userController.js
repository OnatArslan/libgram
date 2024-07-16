const attributes = require("validatorjs/src/attributes");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: [`password`] },
    });
    const currentUser = req.user;
    console.log(currentUser);
    res.status(200).json({
      status: `success`,
      message: `Showing : ${count} objects in this page`,
      data: {
        users: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const friend = await User.findByPk(`19c43472-b851-4e68-aeca-139de315674a`);

    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
    };
    const newUser = await User.create(userData);

    await newUser.addFollower(friend);

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.password || req.body.passwordConfirmation) {
      return res.status(404).json({
        // This must return because set headers error
        status: `fail`,
        message: `You can not use this route for resetting password, try /reset-password instead`,
      });
    }
    const user = await User.findByPk(req.params.id);

    const updatedUser = await user.update(req.body, {});

    res.status(201).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
