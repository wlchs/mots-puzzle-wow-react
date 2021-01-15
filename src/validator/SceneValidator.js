import EntityValidator from './EntityValidator';

/**
 * Class for validating the whole generated puzzle scene
 */
class SceneValidator {
  /**
   * Static method that validates a scene.
   * A scene is valid if it contains four valid entities.
   * @param scene Scene to validate
   * @returns {boolean}
   */
  static validate(scene) {
    /*
     * Retrieve entity set
     */
    const entities = scene.getEntities();

    /*
     * If the number of contained entities is not four, the scene is not valid.
     */
    if (entities.length !== 4) {
      return false;
    }

    /*
     * There must be exactly one unique-marked trait in the scene
     */
    let uniqueCounter = 0;

    for (const entity of entities) {
      for (const trait of entity.traits) {
        uniqueCounter += trait.unique ? 1 : 0;
      }
    }

    if (uniqueCounter !== 1) {
      return false;
    }

    /*
     * If the total number is correct, validate each entity.
     */
    return entities.every(EntityValidator.validate);
  }
}

export default SceneValidator;
