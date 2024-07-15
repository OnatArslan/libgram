exports.signIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
    if (!email || !password || !passwordConfirmation) {
      return next(new Error(`Please enter all the credentials`));
    }

    res.status(200).json({
      status: `success`,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: `fail`,
      message: err,
    });
  }
};
