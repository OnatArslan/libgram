const Book = require("../models/bookModel");
const User = require("../models/userModel");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
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
    const owner = await User.findByPk("2730fbfc-3b54-4e19-9021-35edc2911a0e");

    const newBook = await Book.create({
      name: req.body.name,
      isbn: req.body.isbn,
    });
    await newBook.addOwners(owner);

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
