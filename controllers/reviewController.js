const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");

// If route is /api/v1/review this will return all reviews but route is /api/v1/books/:bookId/reviews this route returns all reviews made on this book
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
      if (!book) {
        return next(new Error(`Can not find this book`));
      }
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
    const title = req.body.title;
    const body = req.body.body;
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return next(new Error(`Can not find this review`));
    }
    console.log(review.dataValues.userId);
    console.log(req.user.id);
    if (review.dataValues.userId !== req.user.id) {
      return next(new Error(`You can not update other persons review`));
    }
    await review.update({
      title: title,
      body: body,
    });

    res.status(200).json({
      status: `success`,
      data: {
        review: review,
      },
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
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return next(new Error(`Can not find review on database`));
    }
    if (req.user.id !== review.dataValues.userId) {
      return next(new Error(`You can not delete other persons review`));
    }
    await review.destroy();
    res.status(200).json({
      status: `success`,
      data: {
        messages: `Review succesfuly deleted...`,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};
