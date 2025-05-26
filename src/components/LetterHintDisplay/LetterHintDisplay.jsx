import React from 'react';
import LetterStatusGroup from '../LetterStatusGroup';
import { LETTER_STATUS } from '../../constants';

const CATEGORY_MODES = {
  DEFAULT: 'default',
  BY_STATUS: 'byStatus',
  VOWELS_AND_CONSONANTS: 'vowelsAndConsonants',
};
const getLettersDataGroupedByStatus = (lettersData) => {
  return Object.entries(
    lettersData.reduce(
      (acc, letterData) => {
        const { status } = letterData;
        if (acc[status]) {
          acc[status].push(letterData);
        } else {
          acc[status] = [letterData];
        }
        return acc;
      },
      Object.values(LETTER_STATUS).reduce((acc, status) => {
        acc[status] = [];
        return acc;
      }, {})
    )
  ).filter(([, groupData]) => groupData.length > 0);
};

const getLetterDataVowelsAndConsonants = (lettersData) => {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  const consonants = [];
  const groupedData = { vowels: [], consonants: [] };

  lettersData.forEach((letterData) => {
    const letter = letterData.letter.toLowerCase();
    if (vowels.includes(letter)) {
      groupedData.vowels.push(letterData);
      if (letter === 'y') {
        // 'y' is considered either a vowel or consonant
        consonants.push(letterData);
      }
    } else {
      consonants.push(letterData);
    }
  });

  groupedData.consonants = consonants;
  return Object.entries(groupedData);
};

/**
 * This component displays the status of letters,
 * giving users multiple options for seeing this
 * status.
 *
 * The user should be able to select one of 3 categorization
 * modes:
 *  - vowels|consonants (with y appearing in both lists)
 *  - by status (correct, misplaced, unknown, and incorrect)
 *  - default
 *
 *
 * @returns
 */
function LetterHintDisplay({ lettersData }) {
  const [catMode, setCatMode] = React.useState(
    CATEGORY_MODES.DEFAULT
  );

  const groupedLettersData =
    catMode === CATEGORY_MODES.DEFAULT
      ? [[CATEGORY_MODES.DEFAULT, lettersData]]
      : catMode === CATEGORY_MODES.BY_STATUS
      ? getLettersDataGroupedByStatus(lettersData)
      : getLetterDataVowelsAndConsonants(lettersData);

  // Pill icons
  const pillIcons = {
    [CATEGORY_MODES.DEFAULT]: (
      <span
        style={{
          fontWeight: 'bold',
          letterSpacing: '0.1em',
        }}
      >
        XYZ
      </span>
    ),
    [CATEGORY_MODES.BY_STATUS]: (
      <span
        style={{
          display: 'inline-flex',
          gap: '0.2em',
          verticalAlign: 'middle',
        }}
      >
        <span className="pill-status pill-status-correct" />
        <span className="pill-status pill-status-present" />
        <span className="pill-status pill-status-incorrect" />
        <span className="pill-status pill-status-unknown" />
      </span>
    ),
    [CATEGORY_MODES.VOWELS_AND_CONSONANTS]: (
      <span style={{ fontWeight: 'bold' }}>
        AE<span style={{ opacity: 0.5 }}>|</span>BC
      </span>
    ),
  };

  const pillLabels = {
    [CATEGORY_MODES.DEFAULT]: 'Default',
    [CATEGORY_MODES.BY_STATUS]: 'By Status',
    [CATEGORY_MODES.VOWELS_AND_CONSONANTS]:
      'Vowels &\n Consonants', // two lines for tooltip
  };

  return (
    <div className="letter-hint-display">
      <div className="letter-hint-display-controls">
        <span className="letter-hint-display-controls-label">
          Categorization mode
        </span>
        <div
          className="pill-group"
          role="radiogroup"
          aria-label="Categorization mode"
        >
          {Object.values(CATEGORY_MODES).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`pill${
                catMode === mode ? ' selected' : ''
              }`}
              aria-pressed={catMode === mode}
              onClick={() => setCatMode(mode)}
              title={pillLabels[mode]}
            >
              {pillIcons[mode]}
              <span className="pill-label">
                {pillLabels[mode]}
              </span>
            </button>
          ))}
        </div>
      </div>
      {groupedLettersData.map(
        ([groupName, groupData], index) => (
          <LetterStatusGroup
            lettersData={groupData}
            name={groupName}
            key={index}
          />
        )
      )}
    </div>
  );
}

export default LetterHintDisplay;
