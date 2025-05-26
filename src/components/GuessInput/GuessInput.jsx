import React, { useState, useRef } from 'react';

const GuessInput = ({ handleGuess }) => {
  const [letters, setLetters] = useState(['', '', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.toUpperCase();
    if (!/^[A-Z]?$/.test(val)) return; // Only allow single letter
    const newLetters = [...letters];
    newLetters[idx] = val;
    setLetters(newLetters);
    if (val && idx < 4) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !letters[idx] && idx > 0) {
      const newLetters = [...letters];
      newLetters[idx - 1] = '';
      setLetters(newLetters);
      inputsRef.current[idx - 1].focus();
      e.preventDefault();
    } else if (e.key === 'Enter') {
      // Manually trigger form submission
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = letters.join('');
    const successfulGuess = handleGuess(guess);
    if (successfulGuess === null) {
      console.log('ERROR');
      throw new Error('Guess attempts exceeded');
    } else if (successfulGuess === false) {
      console.log('Invalid guess');
      // TODO: Add visual feedback for invalid guess
    }
    setLetters(['', '', '', '', '']);
    inputsRef.current[0].focus();
  };

  return (
    <form
      id="guess-input-form"
      className="guess-input-wrapper"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <fieldset
        role="group"
        aria-labelledby="guess-legend"
        style={{ border: 'none', padding: 0, margin: 0 }}
      >
        <legend id="guess-legend" style={{ position: 'absolute', left: '-9999px' }}>
          Enter your 5-letter guess
        </legend>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '0.5rem',
          }}
          aria-describedby="guess-desc"
        >
          <div
            className="guess-input-cells"
            aria-describedby="guess-desc"
          >
            {letters.map((letter, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="text"
                maxLength={1}
                value={letter}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                ref={el => (inputsRef.current[idx] = el)}
                className="cell guess-input-cell"
                aria-label={`Letter ${idx + 1}`}
                aria-describedby="guess-desc"
                autoFocus={idx === 0}
                form="guess-input-form"
                required
                pattern="[A-Za-z]"
              />
            ))}
          </div>
        </div>
        <div id="guess-desc" className="visually-hidden">
          5 input boxes for your guess. Each box is for one letter, left to right.
        </div>
      </fieldset>
    </form>
  );
};

export default GuessInput;
