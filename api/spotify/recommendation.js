const express = require('express');
const router = express.Router();
const axios = require('axios');


const spotifyRecommendationsUrl = 'https://api.spotify.com/v1/recommendations';

router.post('/', (req, res) => {

  const tokenString = req.header('Authorization');
  const token = tokenString.split(' ');

  const { limit, seed_artists, seed_genres, seed_tracks, target_tempo, sort, order } = req.body;

  if (!seed_artists || !seed_genres || !seed_tracks) {
    return res.status(400).json({ error: 'seed_artists, seed_genres, and seed_tracks are required fields' });
  }

  const config = {
    headers: {
      Authorization: tokenString,
    },
  };

  axios
    .get(spotifyRecommendationsUrl, {
      params: {
        limit,
        seed_artists,
        seed_genres,
        seed_tracks,
        target_tempo,
        market: 'US', 
        sort, 
        order,
      },
      ...config,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        res.status(401).json({ error: 'Access token has expired' });
      } else {
        res.status(500).json({ error: 'Error fetching Spotify recommendations' });
      }
    });
})

module.exports = router;
