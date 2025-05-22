import React from 'react';

import { NUM_LETTERS } from '../../constants';

function GuessResults({ guesses }) {
  const getLetters = (guess) => {
    return [
      ...guess.slice(0, NUM_LETTERS).split(''),
      ...Array(NUM_LETTERS).fill(''),
    ].slice(0, NUM_LETTERS);
  };

  return (
    <div className="guess-results">
      {guesses.map((guess, index) => (
        <p key={index} className="guess">
          {getLetters(guess).map((letter, lindex) => {
            return (
              <span key={lindex} className="cell">
                {letter}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

export default GuessResults;
