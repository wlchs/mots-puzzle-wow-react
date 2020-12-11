/**
 * Class representing a single trait of an entity
 */
class Trait {
  /**
   * Initialize option array and selected option pointer
   */
  constructor() {
    this.options = [];
    this.selectedOption = -1;
  }

  /**
   * Get the option container
   * @returns {any[]}
   */
  getOptions() {
    return this.options;
  }

  /**
   * Get the selected option pointer
   * @returns {number}
   */
  getSelectedOption() {
    return this.selectedOption;
  }

  /**
   * Set the selected option pointer
   * @param optionId Index of the option to select
   */
  selectOption(optionId) {
    this.selectedOption = optionId;
  }

  /**
   * Convert trait value to string
   * @returns {string}
   */
  toString() {
    return this.state().toString();
  }

  /**
   * Return raw trait object value
   * @returns {*}
   */
  state() {
    return this.options[this.selectedOption];
  }

  /**
   * Set the unique trait
   */
  setUnique() {
    this.unique = true;
  }

  /**
   * Check whether the trait is unique
   * @returns {boolean}
   */
  isUnique() {
    return this.unique;
  }
}

export default Trait;
