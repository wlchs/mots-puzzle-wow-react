import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles.js';
import Entity from './generator/Entity';

/*
 * Import PNGs
 */
import FE from 'assets/FlowerEmpty.png';
import FF from 'assets/FlowerFull.png';
import LE from 'assets/LeafEmpty.png';
import LF from 'assets/LeafFull.png';
import CFE from 'assets/CircledFlowerEmpty.png';
import CFF from 'assets/CircledFlowerFull.png';
import CLE from 'assets/CircledLeafEmpty.png';
import CLF from 'assets/CircledLeafFull.png';
import Hidden from 'assets/Hidden.png';
import { CircularState } from './generator/Circular';
import { ShapeState } from './generator/Shape';
import { SaturationState } from './generator/Saturation';

function Figure(props) {
  const { circled, leaf, full, visible } = props;

  if (!visible) {
    return <img src={Hidden} alt='hidden' style={styles.tile} />;
  }

  switch ([circled, leaf, full].toString()) {
    case [false, false, false].toString():
      return <img src={FE} alt='empty flower' style={styles.tile} />;

    case [false, false, true].toString():
      return <img src={FF} alt='full flower' style={styles.tile} />;

    case [false, true, false].toString():
      return <img src={LE} alt='empty leaf' style={styles.tile} />;

    case [false, true, true].toString():
      return <img src={LF} alt='full leaf' style={styles.tile} />;

    case [true, false, false].toString():
      return <img src={CFE} alt='circled empty flower' style={styles.tile} />;

    case [true, false, true].toString():
      return <img src={CFF} alt='circled full flower' style={styles.tile} />;

    case [true, true, false].toString():
      return <img src={CLE} alt='circled empty leaf' style={styles.tile} />;

    case [true, true, true].toString():
      return <img src={CLF} alt='circled full leaf' style={styles.tile} />;

    default:
      return <img src={Hidden} alt='hidden' style={styles.tile} />;
  }
}

Figure.propTypes = {
  circled: PropTypes.bool.isRequired,
  leaf: PropTypes.bool.isRequired,
  full: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

function PuzzleTile(props) {
  const { entity, onClick, visible, onMouseOver } = props;
  const traits = entity.getTraits();

  const isCircled = traits.some((t) => t.state() === CircularState.Circular);
  const isLeaf = traits.some((t) => t.state() === ShapeState.Leaf);
  const isFull = traits.some((t) => t.state() === SaturationState.Saturated);

  return (
    <div
      style={styles.tileContainer}
      onClick={onClick}
      onMouseEnter={onMouseOver}
    >
      <Figure
        circled={isCircled}
        leaf={isLeaf}
        full={isFull}
        visible={visible}
      />
    </div>
  );
}

PuzzleTile.propTypes = {
  entity: PropTypes.instanceOf(Entity).isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};

export default PuzzleTile;
