import React from 'react';
import LetterStatusDisplay from '../LetterStatusDisplay/LetterStatusDisplay';

/**
 * This component displays the status of a given list of letters.
 * It is used to show the status of letters in the game, using
 * the LetterStatusDisplay component for each letter.
 *
 * @returns {JSX.Element}
 */
function LetterStatusGroup({ lettersData, name }) {
  return (
    <>
      <span className="letter-status-group-name">
        {name}
      </span>
      <div className="letter-status-group">
        {lettersData.map((letterData, index) => (
          <LetterStatusDisplay
            letterData={letterData}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

export default LetterStatusGroup;
