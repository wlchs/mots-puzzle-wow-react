/**
 * Class representing a single trait of an entity
 */
class Trait {
  /**
   * Initialize option array and selected option pointer
   * @param options {*[]} Possible options' list
   * @param selectedOption {number} Selected option index
   */
  constructor(options, selectedOption) {
    this.options = options || [];
    this.selectedOption = selectedOption === undefined ? -1 : selectedOption;
    this.unique = false;
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
    if (this.options.length === 0 || this.selectedOption < 0) {
      throw new Error('Invalid trait state!');
    }
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
