const User = require(`../models/userModel`);
const Book = require(`../models/bookModel`);
const attributes = require("validatorjs/src/attributes");

// These are daily stuff
// This getProfile controler must go to profileController and profileRoutes must be used for this kind of stuff
// Update profile must be in profileController buy updatePassword must be in authController
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [`username`, `email`, `role`],
      include: [
        {
          as: `follower`,
          model: User,
          attributes: [`username`, `email`],
          through: {
            attributes: [],
          },
        },
        {
          as: `following`,
          model: User,
          attributes: [`username`, `email`],
          through: {
            attributes: [],
          },
        },
        {
          as: `book`,
          model: Book,
          attributes: [`name`, `isbn`],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json({
      status: `success`,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.getFollowers = async (req, res, next) => {
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

exports.getFollowings = async (req, res, next) => {
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

exports.follow = async (req, res, next) => {
  try {
    const followingId = req.params.followingId;
    const following = await User.findByPk(followingId);

    const curUser = await User.findByPk(req.user.id, {
      include: [`following`],
    });

    const isFriendsAlready = curUser.following.some(
      (el) => el.username === following.username
    );
    if (isFriendsAlready) {
      return next(
        new Error(
          `You can not add ${following.username} because you are already friendss`
        )
      );
    }
    req.user.addFollowing(following);
    res.status(200).json({
      status: `success`,
      data: {
        following: following,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    res.status(200).json({
      status: `success`,
      data: {
        following: following,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.addBookToLibrary = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const book = await bookModel.findByPk(bookId);
    req.user.addBook(book);
    res.status(200).json({
      status: `success`,
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

exports.removeBookFromLibrary = async (req, res, next) => {
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

exports.getBooks = async (req, res, next) => {
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
