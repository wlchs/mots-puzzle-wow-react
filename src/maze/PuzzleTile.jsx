import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Entity from '../generator/Entity';

function PuzzleTile(props) {
  const [display, setDisplay] = useState(false);
  const { entity, onClick } = props;
  const traits = entity.getTraits();
  const isCircled = traits.some((t) => t.toString() === 'Circular');
  const leafOrFlower = traits.some((t) => t.toString() === 'Leaf');
  const emptyOrFull = traits.some((t) => t.toString() === 'NonSaturated');
  const traitPath = `/assets/${isCircled ? 'Circled' : ''}${leafOrFlower ? 'Leaf' : 'Flower'}${emptyOrFull ? 'Empty' : 'Full'}.png`;
  const hiddenPath = '/assets/Hidden.png';

  return (
    <button
      type="button"
      className="tile-container"
      onMouseOver={() => setDisplay(true)}
      onFocus={() => setDisplay(true)}
      onMouseOut={() => setDisplay(false)}
      onBlur={() => setDisplay(false)}
      onClick={onClick}
    >
      {
        display
          ? <img src={traitPath} alt={traitPath} className="tile" />
          : <img src={hiddenPath} alt={traitPath} className="tile" />
      }
    </button>
  );
}

PuzzleTile.propTypes = {
  entity: PropTypes.instanceOf(Entity).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PuzzleTile;
