const notFound = (req, res, next) => {
  res.send("Route not found");
  next();
};

module.exports = notFound;
