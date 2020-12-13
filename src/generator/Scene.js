/**
 * Class representing the puzzle scene
 */
class Scene {
  /**
   * Initialize entity container
   */
  constructor() {
    this.entities = [];
  }

  /**
   * Method to add new entity to the entity container
   * @param entity Entity to be added
   */
  addEntity(entity) {
    this.entities.push(entity);
  }

  /**
   * Get the entity container
   * @returns {Entity[]} Array of contained entities
   */
  getEntities() {
    return this.entities;
  }

  /**
   * Set entity container
   * @param entities
   */
  setEntities(entities) {
    this.entities = entities;
  }
}

export default Scene;
