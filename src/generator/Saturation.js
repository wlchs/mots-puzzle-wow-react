import Trait from './Trait';

export const SaturationState = Object.freeze({
  Saturated: Symbol('Full'),
  NonSaturated: Symbol('Empty'),
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
    this.options = Object.values(SaturationState);
  }
}

export default Saturation;