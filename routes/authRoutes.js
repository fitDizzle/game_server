const router = require("express").Router();
const authController = require("../serverController/authController");

router.route("/register").post(authController.register);

router.route("/login").post(authController.login);

router.route("/get-user/:token").get(authController.getUser)

module.exports = router;
