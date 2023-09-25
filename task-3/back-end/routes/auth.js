const { verify_sign_up } = require("../middleware");
const controller = require("../controllers/auth");

module.exports = function(app) {
  app.use(function(_, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/signup",
    [
      verify_sign_up.check_duplicate_username,
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);

  app.post("/auth/refresh-token", controller.refresh_token);
};
