import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
// import {range} from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import Banner from '../Banner';
import { isValidWord } from '../../game-helpers';

const initialGuessesState = Array(
  NUM_OF_GUESSES_ALLOWED
).fill('');

function Game() {
  const [answer, setAnswer] = useState(() => sample(WORDS));
  const [guesses, setGuesses] = useState(
    initialGuessesState
  );
  const [numGuesses, setNumGuesses] = useState(0);
  const gameWon = guesses.indexOf(answer) >= 0;
  const gameLost =
    !gameWon && numGuesses >= NUM_OF_GUESSES_ALLOWED;

  const handleReset = () => {
    setAnswer((prevAns) => {
      let newAns = prevAns;
      while (newAns === prevAns) {
        newAns = sample(WORDS);
      }
      return newAns;
    });
    setGuesses(initialGuessesState);
    setNumGuesses(0);
  };

  const handleGuess = (guess) => {
    if (numGuesses >= NUM_OF_GUESSES_ALLOWED) return null;

    if (isValidWord(guess) === false) {
      return false; // Invalid guess
    }
    setGuesses((prevGuesses) => [
      ...prevGuesses.slice(0, numGuesses),
      guess,
      ...prevGuesses.slice(numGuesses + 1),
    ]);
    setNumGuesses((prevNum) => prevNum + 1);
    return true;
  };
  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      {gameWon || gameLost ? (
        <>
          <Banner
            status={gameWon ? 'win' : 'lost'}
            numGuesses={numGuesses}
            answer={answer}
            resetFunction={handleReset}
          />
        </>
      ) : (
        <GuessInput handleGuess={handleGuess} />
      )}
    </>
  );
}

export default Game;
