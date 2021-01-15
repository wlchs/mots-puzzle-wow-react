import Entity from './Entity';
import Circular from './Circular';
import Saturation from './Saturation';
import Shape from './Shape';

/**
 * Generate trait similarity graph of entity combinations
 * @returns {{vertices: Entity[], edges: [number, number, number][]}}
 */
export function generateEntityGraph() {
  /**
   * Generate all possible entity-trait combinations
   * @type {Entity[]}
   */
  const vertices = [
    new Entity([new Circular(0), new Saturation(0), new Shape(0)]),
    new Entity([new Circular(0), new Saturation(0), new Shape(1)]),
    new Entity([new Circular(0), new Saturation(1), new Shape(0)]),
    new Entity([new Circular(0), new Saturation(1), new Shape(1)]),
    new Entity([new Circular(1), new Saturation(0), new Shape(0)]),
    new Entity([new Circular(1), new Saturation(0), new Shape(1)]),
    new Entity([new Circular(1), new Saturation(1), new Shape(0)]),
    new Entity([new Circular(1), new Saturation(1), new Shape(1)]),
  ];

  /**
   * Edge collection
   * @type {[number, number, number][]}
   */
  const edges = [];

  /**
   * Populate edge array with every possible entity combination
   */
  for (let i = 0; i < vertices.length; i += 1) {
    /**
     * Source node
     * @type {Entity}
     */
    const sourceNode = vertices[i];

    for (let j = 0; j < vertices.length; j += 1) {
      /**
       * Skip loops
       */
      if (i === j) {
        continue;
      }

      /**
       * Target node
       * @type {Entity}
       */
      const targetNode = vertices[j];

      /**
       * Add edge with weight to edge collection
       */
      edges.push([i, j, sourceNode.similarity(targetNode)]);
    }
  }

  return { vertices, edges };
}
