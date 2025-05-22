import React from 'react';

import { NUM_LETTERS } from '../../constants';

function Guess({ value }) {
  const getLetters = (guess) => {
    return [
      ...guess.slice(0, NUM_LETTERS).split(''),
      ...Array(NUM_LETTERS).fill(''),
    ].slice(0, NUM_LETTERS);
  };
  return (
    <p className="guess">
      {getLetters(value).map((letter, lindex) => {
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
