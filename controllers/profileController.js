const User = require(`../models/userModel`);
const Book = require(`../models/bookModel`);

// Get profile is not done you must recap tomorrow and add sample datas to server
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: [`id`, `username`, `email`, `role`, `createdAt`, `updatedAt`],
      include: [
        {
          model: User,
          as: `follower`,
          attributes: [],
          through: { attributes: [] },
        },
        {
          model: User,
          as: `following`,
          attributes: [],
          through: { attributes: [] },
        },
        {
          model: Book,
          as: `book`,
          attributes: [],
          through: { attributes: [] },
        },
      ],
    });

    const countFollower = await user.countFollower();
    const countFollowing = await user.countFollowing();
    const countBook = await user.countBook();

    res.status(200).json({
      status: `success`,
      data: {
        user: user,
        numberOfFollower: countFollower,
        numberOfFollowing: countFollowing,
        numberOfBook: countBook,
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

// Get followers not done
exports.getFollowers = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    const followerCount = await user.countFollower();
    const followers = await user.getFollower({
      attributes: [`username`, `email`, `role`],
      joinTableAttributes: [], // This is for
    });

    res.status(200).json({
      status: `success`,
      data: {
        followerCount: followerCount,
        followers: followers,
      },
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

    if (!curUser) {
      return next(new Error(`Can not find this user`));
    }
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
    const book = await Book.findByPk(bookId);
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
