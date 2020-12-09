import Scene from './Scene';
import Entity from './Entity';
import Circular from './Circular';
import Saturation from './Saturation';
import Shape from './Shape';
import SceneValidator from '../validator/SceneValidator';

/**
 * Fisher-Yates (aka Knuth) Shuffle
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param arr Array to shuffle
 * @returns {*[]} Shuffled array
 */
function shuffle(arr) {
  const array = [...arr];
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Function to generate a new puzzle
 * @returns {Scene}
 */
function generatePuzzle() {
  /*
   * Generate trait map
   */
  const traitMap = [...Array(3).keys()].map((i) => {
    switch (i) {
      case 0:
        return [...Array(4).keys()].map(() => new Circular());
      case 1:
        return [...Array(4).keys()].map(() => new Saturation());
      case 2:
        return [...Array(4).keys()].map(() => new Shape());
      default:
        throw new Error('Trait map out of bounds!');
    }
  });

  /*
   * Shuffle traits
   */
  for (let trait = 0; trait < 3; trait += 1) {
    shuffle([...Array(4).keys()]).forEach((entity, i) => {
      traitMap[trait][entity].selectOption(i % 2);
    });
  }

  /*
   * Random unique entity
   */
  const uniqueEntityId = Math.floor(Math.random() * 4);

  /*
   * Random unique trait
   */
  const uniqueTraitId = Math.floor(Math.random() * 3);

  /*
   * Random unique trait value
   */
  const uniqueTraitValueId = Math.floor(Math.random() * 2);

  /*
   * Assign unique trait
   */
  [...Array(4).keys()].forEach((i) => {
    if (i === uniqueEntityId) {
      traitMap[uniqueTraitId][i].selectOption(uniqueTraitValueId);
      traitMap[uniqueTraitId][i].setUnique();
    } else {
      traitMap[uniqueTraitId][i].selectOption(1 - uniqueTraitValueId);
    }
  });

  /*
   * Create puzzle scene
   */
  const scene = new Scene();

  /*
   * Create entities
   */
  for (let i = 0; i < 4; i += 1) {
    const entity = new Entity();

    /*
     * Add traits
     */
    for (let j = 0; j < 3; j += 1) {
      entity.addTrait(traitMap[j][i]);
    }

    /*
     * Add entity to scene
     */
    scene.addEntity(entity);
  }

  /*
   * Validate the generated puzzle scene
   */
  if (!SceneValidator.validate(scene)) {
    throw new Error('Invalid puzzle!');
  }

  return scene;
}

export default generatePuzzle;
