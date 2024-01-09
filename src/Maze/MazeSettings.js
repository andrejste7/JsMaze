class MazeSettings {
    /** @type Number */
    mazeSize;

    constructor(params = {}) {
        Object.assign(this, params)
    }

    validateMazeSize(mazeSize) {
        if (mazeSize < 2) return 2;
        if (mazeSize > 18) return 18;

        return mazeSize
    }
}