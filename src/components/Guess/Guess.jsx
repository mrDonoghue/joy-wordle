import React from 'react';

import { NUM_LETTERS } from '../../constants';

import { checkGuess } from '../../game-helpers';

function Guess({ value, answer }) {
  return (
    <p className="guess">
      {checkGuess(value, answer).map(
        (letterData, lindex) => {
          return (
            <span
              key={lindex}
              className={`cell ${letterData.status}`}
            >
              {letterData.letter}
            </span>
          );
        }
      )}
    </p>
  );
}

export default Guess;
