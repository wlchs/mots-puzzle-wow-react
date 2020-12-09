import Trait from './Trait';

const SaturationState = Object.freeze({
  Saturated: Symbol('Saturated'),
  NonSaturated: Symbol('NonSaturated'),
});

/**
 * Class that represents the saturation trait of an entity
 */
class Saturation extends Trait {
  /**
   * Initialize option set
   */
  constructor() {
    super();
    this.options = Object.keys(SaturationState);
  }
}

export default Saturation;
