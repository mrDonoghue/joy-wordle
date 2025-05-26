import React, { useState } from 'react';

const GuessInput = ({ handleGuess }) => {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    const newGuess = e.target.value.toUpperCase();
    setGuess(newGuess);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const successfulGuess = handleGuess(guess);
    if (successfulGuess === null) {
      console.log('ERROR');
      throw new Error('Guess attempts exceeded');
    } else if (successfulGuess === false) {
      console.log('Invalid guess');
      // TODO: Add visual feedback for invalid guess
    }
    setGuess('');
  };
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="guess-input"
        value={guess}
        onChange={handleChange}
        minLength={5} //validation broken as of writing by a upperCase in handleChange
        maxLength={5}
        pattern={'[a-zA-Z]{5}'}
        title="5 letters exactly!"
        required
      />
      <label htmlFor="guess-input">Guess!</label>
    </form>
  );
};

export default GuessInput;
