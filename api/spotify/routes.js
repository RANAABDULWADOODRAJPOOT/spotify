const express = require('express');
const router = express.Router();

router.use("/recommendation", require("./recommendation"));

module.exports = router;