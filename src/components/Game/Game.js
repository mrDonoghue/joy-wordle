import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
// import {range} from '../../utils';
import { NUM_OF_GUESSES_ALLOWED, LETTER_STATUS } from '../../constants';
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import Banner from '../Banner';
import { checkGuess, isValidWord } from '../../game-helpers';
import LetterHintDisplay from '../LetterHintDisplay';

const initialGuessesState = Array(
  NUM_OF_GUESSES_ALLOWED
).fill('');

// create the starting letters data with each letter's status set to 'unknown'
const initialLettersData = Array.from(
  { length: 26 },
  (_, i) => ({
    letter: String.fromCharCode(65 + i), // A-Z
    status: LETTER_STATUS.UNKNOWN,
  })
);

const updateLettersData = ({lettersData, guesses, answer}) => {
  const updatedData = JSON.parse(JSON.stringify(lettersData));
  guesses.forEach((guess) => {
    const guessLetters = checkGuess(guess, answer);
    guessLetters.forEach((letter) => {
      const index = updatedData.findIndex(
        (data) => data.letter === letter.letter
      );
      if (index === -1 || updatedData[index].status === LETTER_STATUS.CORRECT) return; 
      // Skip if letter not found or already marked as correct
      if (letter.status === LETTER_STATUS.CORRECT) {
        updatedData[index].status = LETTER_STATUS.CORRECT;
        return; // No need to check further for this letter
      }

      if (updatedData[index].status === LETTER_STATUS.PRESENT) return;

      updatedData[index].status = letter.status;
      });
    });
  return updatedData;
};

function Game() {
  const [answer, setAnswer] = useState(() => sample(WORDS));
  const [guesses, setGuesses] = useState(
    initialGuessesState
  );
  const [numGuesses, setNumGuesses] = useState(0);
  const gameWon = guesses.indexOf(answer) >= 0;
  const gameLost =
    !gameWon && numGuesses >= NUM_OF_GUESSES_ALLOWED;

  const lettersData = updateLettersData({lettersData:initialLettersData, guesses, answer});

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
      return "not recognized"; // Invalid guess
    }
    let alreadyGuessed = false;
    guesses.forEach((g) => {
      if (g.toUpperCase() === guess.toUpperCase()) {
        alreadyGuessed = true; // Guess already made
      }
    });
    if (alreadyGuessed) {
      return "already guessed";
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
        <>
          <GuessInput handleGuess={handleGuess} />
          <LetterHintDisplay lettersData={lettersData} />
        </>
      )}
    </>
  );
}

export default Game;
