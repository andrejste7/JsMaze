/**
 * Maze fields should be represented as a
 * square matrix in order to work
 * @type {number}
 */
const MAZE_SIZE = 10;

/**
 * Instance of a class that provides
 * methods to create maze instances.
 * @type {MazeBuilder}
 */
const mazeInstance = new MazeBuilder(MAZE_SIZE, MAZE_SIZE);

/**
 *
 * @type {MazeNodeMaskBuilder}
 */
const mazeNodeMask = new MazeNodeMaskBuilder();

/**
 * Instance of a class that provides
 * methods to parse array of nodes
 * into a Springy.js graph
 * @type {MazeToSpringyParser}
 */
const mazeToSpringyParser = new MazeToSpringyParser(MAZE_SIZE);
