import React from 'react';

const ScoreCard = ({
  homeTeamName,
  homeTeamScore,
  awayTeamName,
  awayTeamScore,
}) => (
  <div className="score-card-container">
    <div className="team-score">
      <p>{`${homeTeamName} - ${homeTeamScore}`}</p>
    </div>
    <div className="team-score">
      <p>{`${awayTeamName} - ${awayTeamScore}`}</p>
    </div>
  </div>
);

export default ScoreCard;
