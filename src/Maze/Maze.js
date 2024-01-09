class Maze {
    /**
     * Maze fields should be represented as a
     * square matrix in order to work
     * @type {number}
     */
    mazeSize = 10;

    /**
     * Instance of a class that provides
     * methods to create maze instances.
     * @type {?MazeBuilder}
     */
    mazeInstance= null;

    /**
     * Creates a node mask for maze
     * so redundant nodes can be reduced
     * in terms of optimization
     * @type {?MazeNodeMaskBuilder}
     */
    mazeNodeMask= null;

    /**
     * Instance of a class that provides
     * methods to parse array of nodes
     * into a Springy.js graph
     * @type {?MazeToSpringyParser}
     */
    mazeToSpringyParser= null;

    /**
     * Algorithm for maze solving
     * @type {?AlgorithmBase}
     */
    mazeSolvingAlgorithm = null

    /**
     * Springy to share between graph
     * visualization and maze solving
     * for optimization reasons
     * @type {?Springy}
     */
    springy = null

    /**
     * Array of resulting
     * nodes for optimization
     * reasons
     * @type {?[]}
     */
    result = [];

    /**
     * Create node mask layer on the maze
     * @type {[]}
     */
    mask= [];

    constructor(mazeSize, showDots = false) {
        this.mazeSize = mazeSize;

        this.initialize();

        if (showDots) {
            this.mask.forEach(e => this.mazeInstance.maze[e.position.y][e.position.x] = 8);
        }
    }

    initialize() {
        this.mazeInstance = new MazeBuilder(this.mazeSize, this.mazeSize);
        this.mazeNodeMask = new MazeNodeMaskBuilder();
        this.mazeToSpringyParser = new MazeToSpringyParser(this.mazeSize);
        this.mazeSolvingAlgorithm = new Bfs();
        this.mask = this.mazeNodeMask.getMaskLayerFromMaze(this.mazeInstance.maze);
    }

    setAlgorithm(algorithm) {
        this.mazeSolvingAlgorithm = algorithm;
    }

    setSpringy(springy) {
        this.springy = springy;
    }

    setResult(result) {
        this.result = result;
    }

    async show(elementId) {
        this.mazeInstance.display(elementId);
    }
}