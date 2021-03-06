import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles.js';
import { generatePuzzleV2 } from './generator';
import PuzzleTile from './PuzzleTile.jsx';
import Scene from './generator/Scene';

function CorrectGuess({ reset }) {
  return (
    <div style={styles.guessButton} onClick={reset} onKeyPress={reset}>
      <div>Correct guess!</div>
    </div>
  );
}

CorrectGuess.propTypes = {
  reset: PropTypes.func.isRequired,
};

function IncorrectGuess({ reset }) {
  return (
    <div style={styles.guessButton} onClick={reset} onKeyPress={reset}>
      <div>Wrong guess!</div>
    </div>
  );
}

IncorrectGuess.propTypes = {
  reset: PropTypes.func.isRequired,
};

function Guess({ guess, puzzle, reset }) {
  const entities = puzzle.getEntities();

  if (guess !== -1) {
    const traits = entities[guess].getTraits();
    const unique = traits.find((t) => t.isUnique());
    if (unique) {
      return <CorrectGuess reset={reset} />;
    }
    return <IncorrectGuess reset={reset} />;
  }
  return <div />;
}

Guess.propTypes = {
  guess: PropTypes.number.isRequired,
  puzzle: PropTypes.instanceOf(Scene).isRequired,
  reset: PropTypes.func.isRequired,
};

function Puzzle({ easy }) {
  /*
   * Create state
   */
  const [guess, setGuess] = useState(-1);
  const [display, setDisplay] = useState(-1);
  const [puzzle, setPuzzle] = useState(null);

  const regeneratePuzzle = () => {
    setGuess(-1);
    setPuzzle(generatePuzzleV2());
  };

  useEffect(() => {
    regeneratePuzzle();
  }, []);

  if (!puzzle) {
    return <div />;
  }

  /**
   * Get entity array
   * @type {Entity[]}
   */
  const entities = puzzle.getEntities();

  return (
    <div style={styles.motsContainer}>
      {guess !== -1 ? (
        <Guess guess={guess} puzzle={puzzle} reset={regeneratePuzzle} />
      ) : (
        entities.map((e, i) => (
          <PuzzleTile
            entity={e}
            key={e.id()}
            onClick={() => setGuess(i)}
            onMouseOver={() => setDisplay(i)}
            visible={display === i || easy}
          />
        ))
      )}
    </div>
  );
}

Puzzle.propTypes = {
  easy: PropTypes.bool,
};

Puzzle.defaultProps = {
  easy: false,
};

export default Puzzle;
