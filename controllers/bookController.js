const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Review = require(`../models/reviewModel`);
const userBook = require("../models/userBookModel");
const { Json } = require("sequelize/lib/utils");

exports.getAllBooks = async (req, res, next) => {
  try {
    let books;
    let owner;
    if (req.params.userId) {
      owner = await User.findByPk(req.params.userId, {
        include: `book`,
      });
      books = await owner.getBook();
    } else {
      books = await Book.findAll({ include: [`reviews`] });
    }
    res.status(200).json({
      status: `success`,
      data: {
        books: books,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.getBook = async (req, res, next) => {
  try {
    res.status(200).json({
      status: `success`,
      data: {
        hello: hello,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(200).json({
      status: `success`,
      data: {
        newBook: newBook,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.updateBook = async (req, res, next) => {
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

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.status(200).json({
      status: `success`,
      message: `deleted succesfuly`,
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};
