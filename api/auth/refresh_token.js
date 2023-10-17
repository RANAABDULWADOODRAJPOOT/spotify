const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {
  
  const refreshToken = req?.cookies?.refresh_token;

  if (!refreshToken) {
    return res.status(400).json({ error: 'refresh_token is required' });
  }

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;


  axios
    .post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    })
    .then((response) => {
      const newAccessToken = response.data.access_token;
      res.json({ access_token: newAccessToken });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error refreshing access token' });
    });
});

module.exports = router;
