import React from 'react';

import Guess from '../Guess';

function GuessResults({ guesses, answer }) {
  <div className="guess-results">
    {guesses.map((guess, index) => (
      <Guess key={index} value={guess} answer={answer} />
    ))}
  </div>;
}

export default GuessResults;
