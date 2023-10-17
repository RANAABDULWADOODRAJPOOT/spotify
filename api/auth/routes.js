const express = require('express');
const router = express.Router();

router.use("/login", require("./login"));
router.use("/callback", require("./callback"));
router.use("/refresh-token", require("./refresh_token"));


module.exports = router;