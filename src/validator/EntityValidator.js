import TraitValidator from './TraitValidator';

/**
 * Class for validating a single entity of the scene
 */
class EntityValidator {
  /**
   * Static method that validates an entity
   * An entity is valid if it has three valid traits
   * @param entity Entity to validate
   * @returns {boolean}
   */
  static validate(entity) {
    /*
     * Get entity traits
     */
    const traits = entity.getTraits();

    /*
     * If the number of contained traits is not three, the entity is invalid
     */
    if (traits.length !== 3) {
      return false;
    }

    /*
     * If the total number is correct, validate each trait
     */
    return traits.every(TraitValidator.validate);
  }
}

export default EntityValidator;
