const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Review = require(`../models/reviewModel`);
const userBook = require("../models/userBookModel");
const { Json } = require("sequelize/lib/utils");
const { messages } = require("validatorjs/src/lang");

// This controller route /users/:userId/books and /books routes
exports.getAllBooks = async (req, res, next) => {
  try {
    let books;
    let owner;
    let ownerUsername;

    if (req.params.userId) {
      owner = await User.findByPk(req.params.userId, {
        include: `book`,
      });
      if (!owner) {
        return next(new Error(`Can not find this user`));
      }
      books = await owner.getBook();
      ownerUsername = owner.username;
    } else {
      books = await Book.findAll();
    }
    res.status(200).json({
      status: `success`,

      data: {
        username: ownerUsername,
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
    const bookId = req.params.bookId;
    const book = await Book.findByPk(bookId, {
      include: [
        {
          model: Review,
          as: `reviews`,
          attributes: [`title`, `body`, `createdAt`],
          include: [
            {
              model: User,
              as: `owner`,
              attributes: [`username`, `email`],
            },
          ],
        },
      ],
    });
    if (!book) {
      return next(new Error(`Can not find book with this id`));
    }
    const ownerCount = await book.countOwner();

    res.status(200).json({
      status: `success`,
      message: `This book owned by ${ownerCount} users`,
      data: {
        book: book,
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
    const books = await Book.bulkCreate(req.body, { validate: true });

    res.status(200).json({
      status: `success`,
      data: {
        books: books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: `fail`,
      message: err,
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
