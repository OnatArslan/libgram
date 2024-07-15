exports.signIn = async (req, res, next) => {
  try {
    const newUser = {};
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err.message,
    });
  }
};
