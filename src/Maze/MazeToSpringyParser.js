class MazeToSpringyParser {
    constructor(mazeSize) {
        this.higherBoundry = mazeSize * 2;
        this.lowerBoundry = 0;
    }

    /**
     * Builds node name|label based
     * on it position in matrix and
     * sets start and end node names
     * @param node
     * @returns {string}
     */
    buildNodeName(node) {
        if (node.position.y === this.lowerBoundry || node.position.x === this.lowerBoundry) return 'start';

        if (node.position.y === this.higherBoundry || node.position.x === this.higherBoundry) return 'end';

        return `${node.position.y}-${node.position.x}`;
    }

    /**
     * Converts an array of node info
     * into a Springy.js graph
     * @param array
     * @returns {Springy.Graph}
     */
    arrayToSpringy(array) {
        const springyGraph = new Springy.Graph();

        // Build nodes first
        array.forEach((node) => {
            let nodeName = this.buildNodeName(node);

            springyGraph.addNodes(nodeName);
            springyGraph.nodeSet[nodeName].data.node = node;
        });

        // Build edges or connections between every node
        array.forEach((node) => {
            let fromNodeName = this.buildNodeName(node);

            node.neighbours.forEach((neighbour) => {
                let toNodeName = this.buildNodeName(neighbour);

                if (fromNodeName === 'end' || fromNodeName === toNodeName) return;

                springyGraph.addEdges([
                    fromNodeName,
                    toNodeName,
                    {
                        color: '#f5d66f',
                        directional: true,
                        distance: this.getDistance(node, neighbour),
                    },
                ]);
            });
        });

        return springyGraph;
    }

    /**
     * Receives two nodes
     * calculates distance between them
     * @param node
     * @param node
     * @returns {number}
     */
    getDistance(fromNode, toNode) {
        if (toNode.direction === Directions.left || toNode.direction === Directions.right) {
            return Math.abs(fromNode.position.x - toNode.position.x);
        }

        if (toNode.direction === Directions.top || toNode.direction === Directions.bottom) {
            return Math.abs(fromNode.position.y - toNode.position.y);
        }

        return 0;
    }
}
