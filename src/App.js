import React from 'react';
import moment from 'moment';
import './App.css';
import ScoreCard from './ScoreCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const now = moment();

    // for testing, since we haven't started yet
    //const now = moment().add(8, 'days');

    const currentDateString = now.format('YYYY-MM-DD');

    const fetchUrl = `//api.football-data.org/v1/competitions/467/fixtures?timeFrameStart=${currentDateString}&timeFrameEnd=${currentDateString}`;
    const fetchOptions = {
      headers: {
        'X-Auth-Token': process.env.REACT_APP_API_KEY,
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

        this.setState({
          currentDateScores,
        });
      });

    //setInterval(() => { }, 10000);
  }

  render() {
    return (
      <div className="App">
        <div className="score-cards-container">
          {this.state.currentDateScores && this.state.currentDateScores.map(match => (
            <ScoreCard
              key={`${match.homeTeamName}${match.awayTeamName}`}
              homeTeamName={match.homeTeamName}
              homeTeamScore={match.homeTeamScore}
              awayTeamName={match.awayTeamName}
              awayTeamScore={match.awayTeamScore}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
