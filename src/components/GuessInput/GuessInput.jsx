import React, { useState, useRef } from 'react';

const GuessInput = ({ handleGuess }) => {
  const [letters, setLetters] = useState([
    '',
    '',
    '',
    '',
    '',
  ]);
  const [invalidGuess, setInvalidGuess] = useState(false);
  const [shake, setShake] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.toUpperCase();
    if (!/^[A-Z]?$/.test(val)) return; // Only allow single letter
    const newLetters = [...letters];
    newLetters[idx] = val;
    setLetters(newLetters);
    if (invalidGuess) setInvalidGuess(false); // clear error on any change
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
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (letters.some((l) => !l)) {
      setInvalidGuess('incomplete');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    const guess = letters.join('');
    const guessStatus = handleGuess(guess);
    if (guessStatus === null) {
      console.log('ERROR');
      throw new Error('Guess attempts exceeded');
    } else if (guessStatus === 'not recognized') {
      setInvalidGuess('not-recognized');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    } else if (guessStatus === 'already guessed') {
      setInvalidGuess('already-guessed');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setInvalidGuess(false);
    setLetters(['', '', '', '', '']);
    inputsRef.current[0].focus();
  };

  return (
    <form
      id="guess-input-form"
      className={`guess-input-wrapper${
        shake ? ' shake' : ''
      }`}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <fieldset
        role="group"
        aria-labelledby="guess-legend"
        style={{ border: 'none', padding: 0, margin: 0 }}
      >
        <legend
          id="guess-legend"
          className="visually-hidden"
        >
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
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
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
          5 input boxes for your guess. Each box is for one
          letter, left to right.
        </div>
        {invalidGuess && (
          <div
            className="guess-input-error"
            role="alert"
            aria-live="assertive"
            style={{
              textAlign: 'center',
              marginTop: '0.5rem',
            }}
          >
            {invalidGuess === 'incomplete'
              ? 'Please fill in all 5 letters.'
              : invalidGuess === 'already-guessed'
              ? 'You have already guessed that word.'
              : 'Word not recognized. Please try another.'}
          </div>
        )}
      </fieldset>
    </form>
  );
};

export default GuessInput;
