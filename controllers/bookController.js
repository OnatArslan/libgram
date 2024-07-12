const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res, next) => {
  try {
    const hello = {
      name: `Onat`,
      surname: `Arslan`,
    };
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
    const newBook = await Book.create({
      name: req.body.name,
      isbn: req.body.isbn,
    });
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
