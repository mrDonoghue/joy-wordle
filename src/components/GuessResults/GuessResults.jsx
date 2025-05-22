import React from 'react';

import Guess from '../Guess';

function GuessResults({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((guess, index) => (
        <Guess key={index} value={guess} />
      ))}
    </div>
  );
}

export default GuessResults;
