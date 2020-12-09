import Trait from './Trait';

const ShapeState = Object.freeze({
  Leaf: Symbol('Leaf'),
  Flower: Symbol('Flower'),
});

/**
 * Class that represents the shape trait of an entity
 */
class Shape extends Trait {
  /**
   * Initialize option set
   */
  constructor() {
    super();
    this.options = Object.keys(ShapeState);
  }
}

export default Shape;
