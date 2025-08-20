module.exports = function (roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role_id)) {
      res.send({ error: "Access denied" });
      return;
    }

    next();
  };
};
