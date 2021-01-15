import { v1 } from 'uuid';

/**
 * Class representing a single entity of the puzzle
 */
class Entity {
  /**
   * Initialize trait container
   * @param traits {Trait[]?} Trait list
   */
  constructor(traits) {
    this.traits = traits || [];
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

  /**
   * Compare entity to another one and count common traits
   * @param otherEntity {Entity}
   * @returns {number}
   */
  similarity(otherEntity) {
    /**
     * Matching trait counter
     * @type {number}
     */
    let matchingTraits = 0;

    /**
     * Get other entity's traits
     * @type {Trait[]}
     */
    const otherTraits = otherEntity.getTraits();

    /**
     * Iterate over current entity's traits
     */
    for (const trait of this.traits) {
      /**
       * Iterate over other entity's traits
       */
      for (const otherTrait of otherTraits) {
        /**
         * If two traits are of common type and of equal value,
         * increment matching trait counter
         */
        if (
          Object.prototype.toString.call(trait) ===
            Object.prototype.toString.call(otherTrait) &&
          trait.state() === otherTrait.state()
        ) {
          matchingTraits += 1;
          break;
        }
      }
    }

    return matchingTraits;
  }
}

export default Entity;
