const express = require('express');
const router = express.Router();
const request = require('request');
const tokenManager = require('./tokenManager');

const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
const redirectUri = process.env.REDIRECT_URI;
const clientId=process.env.CLIENT_ID;
const clientSecret=process.env.CLIENT_SECRET


router.get('/', (req, res) => {
  const code = req.query.code;

  // Exchange the code for an access token
  request.post(
    {
      url: spotifyTokenUrl,
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const access_token = data.access_token;
        tokenManager.saveToken(access_token);
        res.json({'token': access_token});
      } else {
        res.status(500).json({ error: 'Error authenticating with Spotify' });
      }
    }
  );
});

module.exports = router;
