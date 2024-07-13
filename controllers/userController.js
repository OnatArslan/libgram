const attributes = require("validatorjs/src/attributes");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: [`password`] },
    });
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
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
    };
    const newUser = await User.create(userData);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.password || req.body.passwordConfirmation) {
      return next(
        new Error(
          `You can not reset your password on this route please try /reset-password`
        )
      );
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
      message: err,
    });
  }
};
