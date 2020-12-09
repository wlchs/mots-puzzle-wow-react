import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import generatePuzzle from './generator';
import PuzzleTile from './maze/PuzzleTile';
import Trait from './generator/Trait';

function CorrectGuess(props) {
  const { trait, reset } = props;
  return (
    <button className="guess-button" type="button" onClick={reset} onKeyPress={reset}>
      Correct:
      {trait.toString()}
    </button>
  );
}

CorrectGuess.propTypes = {
  trait: PropTypes.instanceOf(Trait).isRequired,
  reset: PropTypes.func.isRequired,
};

function IncorrectGuess(props) {
  const { reset } = props;

  return (
    <button className="guess-button" type="button" onClick={reset} onKeyPress={reset}>Wrong</button>
  );
}

IncorrectGuess.propTypes = {
  reset: PropTypes.func.isRequired,
};

function App() {
  const [guess, setGuess] = useState(-1);
  const [puzzle, setPuzzle] = useState(null);

  const regeneratePuzzle = () => {
    setGuess(-1);
    setPuzzle(generatePuzzle());
  };

  useEffect(() => {
    regeneratePuzzle();
  }, []);

  if (!puzzle) {
    return (<div />);
  }

  const entities = puzzle.getEntities();

  if (guess !== -1) {
    const traits = entities[guess].getTraits();
    const unique = traits.find((t) => t.isUnique());
    if (unique) {
      return (
        <CorrectGuess trait={unique} reset={() => regeneratePuzzle()} />
      );
    }
    return (
      <IncorrectGuess reset={() => regeneratePuzzle()} />
    );
  }

  return (
    <div className="mots-container">
      {entities.map((e, i) => <PuzzleTile entity={e} key={e.id} onClick={() => setGuess(i)} />)}
    </div>
  );
}

export default App;
