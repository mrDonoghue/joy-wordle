import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
// import {range} from '../../utils';
import {NUM_OF_GUESSES_ALLOWED} from '../../constants';
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import Banner from '../Banner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const initialGuessesState = Array(NUM_OF_GUESSES_ALLOWED).fill("");

function Game() {
  const [guesses, setGuesses] = useState(initialGuessesState);
  const [numGuesses, setNumGuesses] = useState(0);
  const gameWon = guesses.indexOf(answer) >= 0;
  const gameLost = !gameWon && numGuesses >= NUM_OF_GUESSES_ALLOWED;
  
  const addGuess = (guess) => {
    if (numGuesses >= NUM_OF_GUESSES_ALLOWED) return;

    setGuesses((prevGuesses) => (
      [...prevGuesses.slice(0,numGuesses),
        guess, 
        ...prevGuesses.slice(numGuesses+1)]
    ));
    setNumGuesses((prevNum) => prevNum+1);
  }
  return (
  <>
    <GuessResults guesses={guesses} answer={answer}/>
    {
      (gameWon || gameLost
        ? <>
          <Banner 
            status={gameWon ? "win" : "lost"} 
            numGuesses={numGuesses} 
            answer={answer} 
          />
        </>
        : <GuessInput addGuess={addGuess}/>
      )

    }
  </>
  );
}

export default Game;
