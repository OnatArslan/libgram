const User = require(`../models/userModel`);
const Book = require(`../models/bookModel`);

// i handle it right now
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

// Follower controllers
exports.getFollowers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    const followerCount = await user.countFollower();
    const followers = await user.getFollower({
      attributes: [`id`, `username`, `email`, `role`],
      joinTableAttributes: [], // This is for  not include join table
    });

    res.status(200).json({
      status: `success`,
      data: {
        numberOfFollower: followerCount,
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
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    const followingCount = await user.countFollowing();
    const followings = await user.getFollowing({
      attributes: [`id`, `username`, `email`, `role`],
      joinTableAttributes: [],
    });
    res.status(200).json({
      status: `success`,
      data: {
        numberOfFollowings: followingCount,
        followings: followings,
      },
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
      (el) => el.id == following.id
    );

    if (isFriendsAlready) {
      return next(
        new Error(
          `You can not add ${following.username} because you are already friendss`
        )
      );
    }

    if (curUser.id === following.id) {
      return next(new Error(`Can not follow yourself`));
    }

    await req.user.addFollowing(following);
    res.status(200).json({
      status: `success`,
      data: {
        message: `Successfuly followed ${following.username}`,
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
    const followingId = req.params.followingId;
    const currentUser = await User.findByPk(req.user.id, {
      include: [
        {
          model: User,
          as: `following`,
        },
      ],
    });
    const followingUser = await User.findByPk(followingId);
    if (!followingUser) {
      return next(new Error(`Can not find this user`));
    }

    const isFriends = currentUser.following.some((el) => {
      return el.id === followingUser.id;
    });

    if (!isFriends) {
      return next(
        new Error(`Can not unfollow because you are not following this user`)
      );
    }

    await currentUser.removeFollowing(followingUser);

    res.status(200).json({
      status: `success`,
      data: {
        currentUser: `Succesfuly unfollowed ${followingUser.username}`,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

exports.removeFollower = async (req, res, next) => {
  try {
    const followerId = req.params.followerId;
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      include: [{ as: `follower`, model: User }],
    });
    const follower = await User.findByPk(followerId);

    if (!follower) {
      return next(new Error(`Can not find this user`));
    }

    const isFollower = user.follower.some((el) => el.id === follower.id);

    if (!isFollower) {
      return next(
        new Error(`Can not remove follower because user is not your friend`)
      );
    }
    await user.removeFollower(follower);

    res.status(200).json({
      status: `success`,
      data: {
        message: `Follower: ${follower.username} succesfuly removed`,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};

// Books controllers
exports.getBooks = async (req, res, next) => {
  try {
    const bookCount = await req.user.countBook();
    const books = await req.user.getBook({
      attributes: [`id`, `isbn`, `title`, `description`, `authors`],
      joinTableAttributes: [],
    });

    res.status(200).json({
      status: `success`,
      data: {
        numberOfBooks: bookCount,
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

exports.addBookToLibrary = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return next(new Error(`Can not find book with given id!`));
    }
    req.user.addBook(book);
    res.status(200).json({
      status: `success`,
      data: {
        message: `${book.title} succesfully added to library`,
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
    const bookId = req.params.bookId;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return next(new Error(`Can not find a book with given id`));
    }
    req.user.removeBook(book);
    res.status(200).json({
      status: `success`,
      data: {
        message: `${book.name} removed succesfully...`,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};
