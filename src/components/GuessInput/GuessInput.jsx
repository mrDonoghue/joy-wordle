import React, { useState } from 'react';

const GuessInput = () => {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    const newGuess = e.target.value.toUpperCase();
    setGuess(newGuess);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(guess);
    setGuess('');
  };
  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Guess!</label>
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
    </form>
  );
};

export default GuessInput;
