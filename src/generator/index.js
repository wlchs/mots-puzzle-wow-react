import Scene from './Scene';
import Entity from './Entity';
import Circular from './Circular';
import Saturation from './Saturation';
import Shape from './Shape';
import SceneValidator from '../validator/SceneValidator';
import { generateEntityGraph } from './EntityGraph';

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
 * Generate array of 'length' filled with numbers starting from 'from' or 0.
 * @param len
 * @param from
 * @returns {[]}
 */
export function range(len, from) {
  const array = [];
  const start = from || 0;

  for (let i = start; i < len + start; i += 1) {
    array.push(i);
  }

  return array;
}

/**
 * Function to generate a new puzzle.
 * Allows duplicated entities.
 * @returns {Scene}
 */
export function generatePuzzle() {
  /*
   * Generate trait map
   */
  const traitMap = [
    [new Circular(), new Circular(), new Circular(), new Circular()],
    [new Saturation(), new Saturation(), new Saturation(), new Saturation()],
    [new Shape(), new Shape(), new Shape(), new Shape()],
  ];

  /*
   * Shuffle traits
   */
  for (let trait = 0; trait < 3; trait += 1) {
    shuffle([0, 1, 2, 3]).forEach((entity, i) => {
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
  [0, 1, 2, 3].forEach((i) => {
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

/**
 * Function to generate a new puzzle.
 * No duplicate entities allowed
 * @returns {Scene}
 */
export function generatePuzzleV2() {
  /**
   * Create puzzle scene
   * @type {Scene}
   */
  const scene = new Scene();

  /**
   * Generate entity graph
   * @type {Entity[]}
   */
  const { vertices } = generateEntityGraph();

  /**
   * Random entity id
   * @type {number}
   */
  const uniqueEntityId = Math.floor(Math.random() * vertices.length);

  /**
   * Unique entity
   * @type {Entity}
   */
  const uniqueEntity = vertices[uniqueEntityId];

  /**
   * Random trait id
   * @type {number}
   */
  const uniqueTraitId = Math.floor(Math.random() * uniqueEntity.traits.length);

  /**
   * Unique trait
   * @type {Trait}
   */
  const uniqueTrait = uniqueEntity.traits[uniqueTraitId];

  /*
   * Set unique trait
   */
  uniqueTrait.setUnique();

  /**
   * Remove entities with conflicting traits
   * @type {Entity[]}
   */
  const remainingVertices = vertices.filter(
    (v) =>
      v.traits[uniqueTraitId].selectedOption !== uniqueTrait.selectedOption,
  );

  /**
   * Pick the other three entities randomly
   * @type {Entity[]}
   */
  const otherEntities = shuffle(remainingVertices).slice(0, 3);

  /*
   * Assign entity set
   */
  scene.setEntities([uniqueEntity, ...otherEntities]);

  /**
   * Get entity array
   * @type {Entity[]}
   */
  const entities = scene.getEntities();

  /*
   * Shuffle entity array
   */
  scene.setEntities(shuffle(entities));

  /*
   * Validate the generated puzzle scene
   */
  if (!SceneValidator.validate(scene)) {
    throw new Error('Invalid puzzle!');
  }

  return scene;
}
