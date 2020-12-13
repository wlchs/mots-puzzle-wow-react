import Trait from './Trait';

export const CircularState = Object.freeze({
  Circular: Symbol('Circled'),
  NonCircular: Symbol('Not circled'),
});

/**
 * Class that represents the circular trait of an entity
 */
class Circular extends Trait {
  /**
   * Initialize option set
   * @param selectedOption
   */
  constructor(selectedOption) {
    super(selectedOption);
    this.options = Object.values(CircularState);
  }
}

export default Circular;
