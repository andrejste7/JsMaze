class Dijkstra extends AlgorithmBase {
    constructor() {
        super();

        // array that holds result of DFS
        this.result = [];

        // Springy.js
        this.springy = null;
    }

    traverse(springy) {
        this.springy = springy;

        this.addDijkstraToSpringy();

        const startNode = this.springy.graph.nodes.find((n) => n.id === 'start');

        let currentNode = startNode;
        currentNode.dijkstra.distance = 0;
        while (currentNode) {
            currentNode = this.closestUnvisitedNode(currentNode);
            if (currentNode) {
                currentNode.dijkstra.visited = true;

                this.visitNode(currentNode);
            }
        }

        return this.getPath();
    }

    visitNode(node) {
        let returnNode = null;

        const { edgeList } = node.dijkstra;

        if (!edgeList?.length) {
            return returnNode;
        }

        for (const edge of edgeList) {
            returnNode = edge.fromNode.id === node.id ? edge.toNode : edge.fromNode;
            const distance = node.dijkstra.distance + edge.distance;
            if (returnNode.dijkstra.distance > distance) {
                returnNode.dijkstra.distance = distance;
                returnNode.dijkstra.parent = node;
            }
        }

        return returnNode;
    }

    closestUnvisitedNode() {
        let returnNode = null;

        for (const node of this.springy.graph.nodes) {
            if (node.dijkstra.visited) {
                continue;
            }

            if (!returnNode) {
                returnNode = node;
            } else if (returnNode.dijkstra.distance > node.dijkstra.distance) {
                returnNode = node;
            }
        }

        return returnNode;
    }

    addDijkstraToSpringy() {
        for (const node of this.springy.graph.nodes) {
            node.dijkstra = {
                edgeList: [],
                parent: null,
                visited: false,
                distance: Infinity,
            };
        }

        for (const edge of this.springy.graph.edges) {
            const fromNodeSpringy = this.springy.graph.nodes.find((x) => x.id === edge.source.id);
            const toNodeSpringy = this.springy.graph.nodes.find((x) => x.id === edge.target.id);

            this.addEdge(new Edge(fromNodeSpringy, toNodeSpringy, edge.data.distance));
        }
    }

    addEdge(edge) {
        const { nodes } = this.springy.graph;
        edge.fromNode.dijkstra.edgeList.push(edge);
        edge.toNode.dijkstra.edgeList.push(edge);

        if (!nodes.find((x) => x.id === edge.fromNode.id)) {
            nodes.push(edge.fromNode);
        }

        if (!nodes.find((x) => x.id === edge.toNode.id)) {
            nodes.push(edge.toNode);
        }
    }

    getPath(id = 'end') {
        let currentNode = this.springy.graph.nodes.find((x) => x.id === id);
        const path = [];

        while (currentNode) {
            path.push(currentNode);
            currentNode = currentNode.dijkstra.parent;
        }

        return path.reverse();
    }
}

class Edge {
    constructor(fromNode, toNode, distance) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.distance = distance;
    }
}
