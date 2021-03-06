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
   * @param selectedOption
   */
  constructor(selectedOption) {
    super(Object.values(ShapeState), selectedOption);
  }
}

export default Shape;
