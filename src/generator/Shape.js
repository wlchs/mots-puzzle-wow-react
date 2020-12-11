import Trait from './Trait';

export const ShapeState = Object.freeze({
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
    this.options = Object.values(ShapeState);
  }
}

export default Shape;
