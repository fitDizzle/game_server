const router = require("express").Router();

const loadController = require("../serverController/loadController")
const authorizeUserAccess = require("../middleware/authorize")


router.route("/all-active").get(loadController.fetchActiveGames)

router.route("/active/:id").get(loadController.loadActiveGame)


module.exports = router;
