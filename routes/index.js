var express = require('express');
var moment = require('moment');
var fetch = require('node-fetch');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const now = moment();
  const currentDateString = now.format('YYYY-MM-DD');
  
  const fetchUrl = `https://api.football-data.org/v1/competitions/467/fixtures?timeFrameStart=${currentDateString}&timeFrameEnd=${currentDateString}`;
  const fetchOptions = {
    headers: {
      'X-Auth-Token': process.env.API_KEY,
    },
  };

  fetch(fetchUrl, fetchOptions)
    .then(response => response.json())
    .then(body => {
      const currentDateScores = body.fixtures.map(fixture => {
        const {
          homeTeamName,
          result: {
            goalsHomeTeam,
          },
          awayTeamName,
          result: {
            goalsAwayTeam,
          },
        } = fixture;

        return {
          homeTeamName,
          homeTeamScore: goalsHomeTeam || 0,
          awayTeamName,
          awayTeamScore: goalsAwayTeam || 0,
        };
      });

      res.send(JSON.stringify(currentDateScores));
    });
});

module.exports = router;
