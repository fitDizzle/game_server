const router = require("express").Router();
const gameplayController = require("../serverController/gameplayController");

router.route("/word/check/:word").get(gameplayController.validateWord);

router.route("/save-game/active").post(gameplayController.saveActiveGame)

router.route("/update-game/active/:id").post(gameplayController.updateActiveGame)

router.route("/delete-game/active/:id").delete(gameplayController.deleteActiveGame);



module.exports = router;
