const express = require('express');
const router = express.Router();
const axios = require('axios');
const tokenManager = require('../auth/tokenManager');

const spotifyRecommendationsUrl = 'https://api.spotify.com/v1/recommendations';

router.get('/', (req, res) => {
  // Handle Spotify recommendation logic using the access token

  const tokenString = req.header('Authorization');
  const token=tokenString.split(' ');


  if (!tokenManager.getToken(token[1])) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    const { limit, seed_artists, seed_genres, seed_tracks, target_tempo } = req.query;

    const config = {
      headers: {
        Authorization: tokenString,
      },
    };

    axios
      .get(spotifyRecommendationsUrl, {
        params: { limit, seed_artists, seed_genres, seed_tracks, target_tempo },
        ...config,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error fetching Spotify recommendations' });
      });
  }
});

module.exports = router;
