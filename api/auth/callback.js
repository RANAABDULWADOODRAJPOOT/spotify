const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({"code":req?.query?.code});
});

module.exports = router;
