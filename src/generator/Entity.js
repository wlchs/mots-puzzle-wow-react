import { v1 } from 'uuid';

/**
 * Class representing a single entity of the puzzle
 */
class Entity {
  /**
   * Initialize trait container
   */
  constructor() {
    this.traits = [];
    this.id = v1();
  }

  /**
   * Add trait to the trait container
   * @param trait Trait to be added
   */
  addTrait(trait) {
    this.traits.push(trait);
  }

  /**
   * Add multiple traits to trait container
   * @param traits
   */
  addTraits(traits) {
    for (const trait of traits) {
      this.addTrait(trait);
    }
  }

  /**
   * Get the trait container
   * @returns {Trait[]} Trait container
   */
  getTraits() {
    return this.traits;
  }
}

export default Entity;
