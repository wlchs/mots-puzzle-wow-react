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
   * @param selectedOption
   */
  constructor(selectedOption) {
    super(Object.values(SaturationState), selectedOption);
  }
}

export default Saturation;
