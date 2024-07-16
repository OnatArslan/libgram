const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const Book = require("../models/bookModel");

// If route is /api/b1/review this will return all reviews but route is /api/v1/books/:bookId/reviews this route returns all reviews made on this book
exports.getAllReviews = async (req, res, next) => {
  try {
    let reviews;
    if (req.params.bookId) {
      reviews = await Review.findAll({ where: { bookId: req.params.bookId } });
    } else {
      reviews = await Review.findAll();
    }
    res.status(200).json({
      status: `success`,
      data: {
        reviews: reviews,
      },
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
    let newReview;
    if (req.params.bookId) {
      const book = await Book.findByPk(req.params.bookId);
      newReview = await Review.create({
        title: req.body.title,
        body: req.body.body,
        bookId: book.id,
        userId: req.user.id,
      });
    } else {
      return next(new Error(`Review must belong to a specific book`));
    }
    res.status(200).json({
      status: `success`,
      data: {
        newReview: newReview,
      },
    });
  } catch (err) {
    console.log(err);
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
