import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles.js';
import generatePuzzle from './generator';
import PuzzleTile from './PuzzleTile.jsx';
import Scene from './generator/Scene';

function CorrectGuess(props) {
  const { reset } = props;
  return (
    <div style={styles.guessButton} onClick={reset} onKeyPress={reset}>
      <div>Correct guess</div>
      <div>Click to try again!</div>
    </div>
  );
}

CorrectGuess.propTypes = {
  reset: PropTypes.func.isRequired,
};

function IncorrectGuess(props) {
  const { reset } = props;

  return (
    <div style={styles.guessButton} onClick={reset} onKeyPress={reset}>
      <div>Wrong guess</div>
      <div>Click to try again!</div>
    </div>
  );
}

IncorrectGuess.propTypes = {
  reset: PropTypes.func.isRequired,
};

function Guess(props) {
  const { guess, puzzle, reset } = props;
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

function Puzzle() {
  const [guess, setGuess] = useState(-1);
  const [display, setDisplay] = useState(-1);
  const [puzzle, setPuzzle] = useState(null);

  const regeneratePuzzle = () => {
    setGuess(-1);
    setPuzzle(generatePuzzle());
  };

  useEffect(() => {
    regeneratePuzzle();
  }, []);

  if (!puzzle) {
    return <div />;
  }

  const entities = puzzle.getEntities();

  return (
    <div style={styles.motsContainer}>
      {guess !== -1 ? (
        <Guess guess={guess} puzzle={puzzle} reset={regeneratePuzzle} />
      ) : (
        entities.map((e, i) => (
          <PuzzleTile
            entity={e}
            key={e.id}
            onClick={() => setGuess(i)}
            onMouseOver={() => setDisplay(i)}
            visible={display === i}
          />
        ))
      )}
    </div>
  );
}

export default Puzzle;
