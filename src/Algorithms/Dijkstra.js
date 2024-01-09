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

        // Doing the magic

        // Example if getting the start node
        // this.springy.graph.nodes.find((n) => n.id === 'start');
        // and id === 'end' for the target node

        // The result must contain
        // the array of
        // Springy nodes
        return this.result;
    }
}
