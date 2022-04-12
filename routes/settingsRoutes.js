const router = require("express").Router();
const settingsController = require("../serverController/settingsController");

router.route("/:username").get(settingsController.getSettings);
router.route("/update/:options").get(settingsController.updateSettings);
router.route("/reset/:username").get(settingsController.resetSettings);

module.exports = router;
