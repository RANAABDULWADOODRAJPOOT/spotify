const express = require('express');
const router = express.Router();
const tokenManager = require('./tokenManager');

router.get('/', (req, res) => {
    const tokenString = req.header('Authorization');
    const token = tokenString.split(' ');
    tokenManager.removeToken(token[1])
    res.json({
            "Message": "Logout Successfully"
    })
});
module.exports = router;