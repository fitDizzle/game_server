const router = require('express').Router();
const authenticateUser = require("../middleware/authenticate")
const authorizeUserAccess = require("../middleware/authorize")


router.use("/auth", require("./authRoutes"))
router.use("/gameplay", authenticateUser, authorizeUserAccess, require("./gameplayRoutes"))
router.use("/load", authenticateUser, authorizeUserAccess, require("./loadRoutes"))
router.use("/settings",authenticateUser, authorizeUserAccess, require("./settingsRoutes"));


module.exports = router;