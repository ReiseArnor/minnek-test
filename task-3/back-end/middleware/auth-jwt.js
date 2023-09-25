const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

const { TokenExpiredError } = jwt;

const catch_error = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verify_token = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catch_error(err, res);
    }
    req.user_id = decoded.id;
    return next();
  });
};

const auth_jwt = {
  verify_token: verify_token,
};

module.exports = auth_jwt;
