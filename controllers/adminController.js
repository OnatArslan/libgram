const User = require("../models/userModel");
const Book = require(`../models/bookModel`);
// All this routes for admin's regular user can not use this routes

exports.getAllUsers = async (req, res, next) => {
  try {
    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: [`password`] },
      order: [
        [`role`, `DESC`],
        [`username`, `ASC`],
      ],
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

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: [`id`, `username`, `email`, `role`],
      include: [
        {
          model: Book,
          as: `book`,
          attributes: [`name`, `isbn`],
        },
        {
          model: User,
          as: `follower`,
          attributes: [`username`, `email`],
        },
        {
          model: User,
          as: `following`,
          attributes: [`username`, `email`],
        },
      ],
    });
    res.status(201).json({
      status: "success",
      data: { user: user },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
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
      role: `admin`,
    };

    const newUser = await User.create(userData);

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
        message: `Admin succesfuly created`,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

// For change user's role if neccessary
exports.updateUser = async (req, res, next) => {
  try {
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

exports.deleteUser = async (req, res, next) => {
  try {
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
