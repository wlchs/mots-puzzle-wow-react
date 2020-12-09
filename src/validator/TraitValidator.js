/**
 * Class for validating a single entity trait
 */
class TraitValidator {
  /**
   * Static method that validates an entity trait
   * @param trait Trait to validate
   * @returns {boolean}
   */
  static validate(trait) {
    /*
     * Get trait options
     */
    const options = trait.getOptions();

    /*
     * Verify that there are exactly two options to choose from
     */
    if (options.length !== 2) {
      return false;
    }

    /*
     * Get selected option pointer
     */
    const optionPointer = trait.getSelectedOption();

    /*
     * Verify that the option pointer points at an existing option
     */
    return optionPointer >= 0 && optionPointer < options.length;
  }
}

export default TraitValidator;
