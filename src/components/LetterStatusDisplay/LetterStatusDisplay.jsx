import React from 'react';

/**
 * This component displays the status of a single possible letter
 * in the game. Possible statuses include:
 * - 'correct' for a letter whose correct position is known
 * - 'present' for a letter that is in the word but whose correct position is
 *    not yet known
 * - 'incorrect' for a letter that is known not to be in the word
 * - 'unknown' for a letter that has not yet been guessed
 * @returns
 */
function LetterStatusDisplay({ letterData }) {
  return (
    <span
      className={`letter-status ${letterData.status}`}
      title={letterData.status}
    >
      {letterData.letter}
    </span>
  );
}

export default LetterStatusDisplay;
