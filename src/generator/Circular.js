import Trait from './Trait';

const CircularState = Object.freeze({
  Circular: Symbol('Circular'),
  NonCircular: Symbol('NonCircular'),
});

/**
 * Class that represents the circular trait of an entity
 */
class Circular extends Trait {
  /**
   * Initialize option set
   */
  constructor() {
    super();
    this.options = Object.keys(CircularState);
  }
}

export default Circular;
