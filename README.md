# Word Game

## Based on Joy of React, Project I (by Josh Comeau)

This project is a modern reimagining of the instant classic Wordle game, originally built as part of the [Joy of React](https://courses.joshwcomeau.com/joy-of-react/) curriculum by Josh Comeau. While the core gameplay and learning objectives remain inspired by the original, this version introduces significant enhancements and new features that go beyond the recommended stretch goals.

---

## Major Improvements

### 1. Fieldset with Separate Input Boxes

Instead of a single text input, this version features a **fieldset with individual input boxes for each letter**.

While Josh's recommended approach of a single input box is a huge win for accessibility over the original Wordle, we sacrifice some aesthetics with an input that seems entirely disconnected from the guess display. In this version, we keep the accessibility wins of Josh's version (at least I think/hope so?) but with a more consistent theming. 

The fieldset approach also makes it much easier for a user to plan out their guess without resorting to common "hacks" like putting an X for an as-yet undecided letter.


### 2. Customizable Letter Hint Display

Of course, the classic Wordle includes a visual keyboard with styling to indicate the status of letters based on the user's guesses. Josh's stretch goal asks us to replicate this feature.

Instead of a clone of this feature, we have opted instead for a letter status display centered around alphabetical order. We offer 3 categorization modes for this display: default, by letter status, and vowels–consonants.

---


## Getting Started

This project uses [Parcel](https://parceljs.org/) for local development. To run the game:

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:1234](http://localhost:1234) in your browser.

---

## Credits
- Josh Wardle, creator of the original Wordle
- **Original concept and curriculum:** [Josh Comeau, Joy of React](https://courses.joshwcomeau.com/joy-of-react/) (Wonderful course. If you're not fully confident in react, try it out!)
- **Major enhancements and new features:** This fork

---

## Stretch Goals from the Original Project

Josh’s original stretch goals included:
- Visual keyboard display
- Restart button

This version supersedes those with a more interactive input system and advanced hinting features.

---

Feel free to explore the codebase and try out the new features!
