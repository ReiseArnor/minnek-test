const db = require("../models");
const User = db.user;

check_duplicate_username = async (req, res, next) => {
  const username = await User.findOne({
    where: {
      username: req.body.username
    }
  });
  if (username) {
    return res.status(400).send({
      message: "Failed! Username is already in use!"
    });
  }

  return next();
};

const verify_sign_up = {
  check_duplicate_username: check_duplicate_username,
};

module.exports = verify_sign_up;
