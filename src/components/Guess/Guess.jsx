import React from 'react';

import { NUM_LETTERS } from '../../constants';

function Guess({ guess }) {
  const getLetters = (guess) => {
    return [
      ...guess.slice(0, NUM_LETTERS).split(''),
      ...Array(NUM_LETTERS).fill(''),
    ].slice(0, NUM_LETTERS);
  };
  return (
    <p className="guess">
      {getLetters(guess).map((letter, lindex) => {
        return (
          <span key={lindex} className="cell">
            {letter}
          </span>
        );
      })}
    </p>
  );
}

export default Guess;
