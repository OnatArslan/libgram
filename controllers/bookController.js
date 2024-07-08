exports.getAllTours = async (req, res, next) => {
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
};
