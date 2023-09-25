const { auth_jwt } = require("../middleware");
const multer = require("multer")({dest: 'uploads/'});
const controller = require("../controllers/dog");

module.exports = function(app) {
    app.get("/dog/:id", [auth_jwt.verify_token], controller.get_dog);

    app.get("/dog-list", [auth_jwt.verify_token], controller.get_dogs_list);

    app.get("/last-dogs", [auth_jwt.verify_token], controller.last_dogs);

    app.get("/dog-count", [auth_jwt.verify_token], controller.get_dog_count);

    app.post("/create-dog", [auth_jwt.verify_token, multer.single("img")], controller.create_dog);

    app.put("/update-dog", [auth_jwt.verify_token, multer.single("img")], controller.update_dog);

    app.delete("/delete-dog", [auth_jwt.verify_token], controller.delete_dog);

    app.get("/get-image/:img", controller.get_image);
};
