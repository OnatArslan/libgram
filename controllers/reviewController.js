const Review = require("../models/reviewModel");
const User = require("../models/userModel");

exports.getAllReviews = async (req, res, next) => {
  try {
    const { count, rows } = await Review.findAndCountAll();
    res.status(200).json({
      status: `success`,
      data: {
        reviews: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.getReview = async (req, res, next) => {
  try {
    res.status(200).json({
      status: `success`,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(200).json({
      status: `success`,
      data: {
        newReview: newReview,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    res.status(200).json({
      status: `success`,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    res.status(200).json({
      status: `success`,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};
