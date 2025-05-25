import React from 'react';

const Banner = ({
  status,
  numGuesses,
  answer,
  resetFunction,
}) => {
  const className = `${
    status === 'win' ? 'happy' : 'sad'
  } banner`;
  return (
    <div className={className}>
      <p>
        {status === 'win' ? (
          numGuesses === 1 ? (
            <>
              <strong>WOW!!!</strong> Only 1 guess!🔥
            </>
          ) : (
            <>
              <strong>Congratulations!</strong> Got it in{' '}
              <strong>{numGuesses} guesses</strong>.
            </>
          )
        ) : (
          <>
            Sorry, the correct answer is{' '}
            <strong>{answer}</strong>.
          </>
        )}
      </p>
      <button onClick={resetFunction}>Play Again</button>
    </div>
  );
};

export default Banner;
