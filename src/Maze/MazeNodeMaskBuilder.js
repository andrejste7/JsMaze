class MazeNodeMaskBuilder {
    /**
     * Checks whether the field is a
     * wall or not
     * @param element
     * @returns {boolean}
     */
    isObstacle(element) {
        if (element === 1) return true;
    }

    /**
     * Iterates over the mask layer nodes
     * and updates the neighbour positions
     * based on their direction
     * @param matrix
     * @param node
     */
    getClosestNode(matrix, node) {
        switch (node.direction) {
            case Directions.top:
                while (
                    matrix.find((e) => e.position.y === node.position.y && e.position.x === node.position.x) ===
                    undefined
                )
                    node.position.y -= 1;
                break;

            case Directions.right:
                while (
                    matrix.find((e) => e.position.y === node.position.y && e.position.x === node.position.x) ===
                    undefined
                )
                    node.position.x += 1;
                break;

            case Directions.bottom:
                while (
                    matrix.find((e) => e.position.y === node.position.y && e.position.x === node.position.x) ===
                    undefined
                )
                    node.position.y += 1;
                break;

            case Directions.left:
                while (
                    matrix.find((e) => e.position.y === node.position.y && e.position.x === node.position.x) ===
                    undefined
                )
                    node.position.x -= 1;
                break;
        }
    }

    /**
     * Creates a mask layer of nodes
     * that will be representing
     * the future maze graph
     * @param matrix
     * @returns {*[]}
     */
    getMaskLayerFromMaze(matrix) {
        const nodeMask = this.removeRedundantFieldsFromMatrix(matrix);

        nodeMask.forEach((node) => {
            node.neighbours.forEach((neighbour) => {
                this.getClosestNode(nodeMask, neighbour);
            });
        });

        return nodeMask;
    }

    /**
     * Iterates over matrix multiple
     * times to remove all the unnecessary
     * fields that interfere to create
     * node mask layer
     * @param matrix
     * @returns {*[]}
     */
    removeRedundantFieldsFromMatrix(matrix) {
        const nodeMask = [];

        // remove elements that are representing walls in maze and build path options
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                if (this.isObstacle(matrix[i][j])) continue;

                let neighbours = [];

                if (i - 1 > 0 && !this.isObstacle(matrix[i - 1][j]))
                    neighbours.push({ direction: Directions.top, position: { x: j, y: i - 1 } });
                if (j - 1 > 0 && !this.isObstacle(matrix[i][j - 1]))
                    neighbours.push({ direction: Directions.left, position: { x: j - 1, y: i } });
                if (j + 1 < matrix.length && !this.isObstacle(matrix[i][j + 1]))
                    neighbours.push({ direction: Directions.right, position: { x: j + 1, y: i } });
                if (i + 1 < matrix.length && !this.isObstacle(matrix[i + 1][j]))
                    neighbours.push({ direction: Directions.bottom, position: { x: j, y: i + 1 } });

                if (neighbours.length <= 0) continue;

                const pathOptions = { position: { x: j, y: i }, neighbours: neighbours };

                nodeMask.push(pathOptions);
            }
        }

        // remove elements that have exactly two neighbours on the opposite directions
        for (let i = 0; i < nodeMask.length; i++) {
            if (
                nodeMask[i]?.neighbours?.length &&
                nodeMask[i].neighbours.length === 2 &&
                nodeMask[i].neighbours.filter((e) => e.direction === Directions.left).length === 1 &&
                nodeMask[i].neighbours.filter((e) => e.direction === Directions.right).length === 1
            ) {
                nodeMask[i] = 'x';
            }

            if (
                nodeMask[i]?.neighbours?.length &&
                nodeMask[i].neighbours.length === 2 &&
                nodeMask[i].neighbours.filter((e) => e.direction === Directions.top).length === 1 &&
                nodeMask[i].neighbours.filter((e) => e.direction === Directions.bottom).length === 1
            ) {
                nodeMask[i] = 'x';
            }
        }

        return nodeMask.filter((x) => x !== 'x');
    }
}
