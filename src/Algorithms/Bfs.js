class Bfs extends AlgorithmBase {
    constructor() {
        super();

        // array that holds result of BFS
        this.result = [];

        // queue for visiting nodes
        this.queue = new Queue();

        // Springy.js
        this.springy = null;

        // Algorithm starting node
        this.selectedNode = null;
    }

    getNextNodes(node) {
        let edges = this.springy.graph.edges;
        let nodes = [];

        for (let i = 0; i < edges.length; i++) {
            if (
                edges[i].source === node &&
                !this.result.includes(edges[i].target) &&
                !Object.values(this.queue.queue).includes(edges[i].target)
            ) {
                nodes.push(edges[i].target);
            }

            if (
                edges[i].target === node &&
                !this.result.includes(edges[i].source) &&
                !Object.values(this.queue.queue).includes(edges[i].source)
            ) {
                nodes.push(edges[i].source);
            }
        }

        return nodes;
    }

    traverse(springy) {
        this.springy = springy;

        this.selectedNode = this.springy.graph.nodes.find((n) => n.id === 'start');

        if (this.selectedNode !== null) {
            this.result.push(this.selectedNode);
            let edges = this.springy.graph.edges;

            for (let i = 0; i < edges.length; i++) {
                if (edges[i].source === this.selectedNode) {
                    this.queue.enqueue(edges[i].target);
                }
                if (edges[i].target === this.selectedNode) {
                    this.queue.enqueue(edges[i].source);
                }
            }

            this.recursiveTraverse();

            return this.result;
        }
    }

    recursiveTraverse() {
        let nodeToSearch = this.queue.dequeue();

        if (nodeToSearch !== null) {
            this.result.push(nodeToSearch);
            if (nodeToSearch.id === 'end') return;
        } else return;

        let nodes = this.getNextNodes(nodeToSearch);
        if (nodes.length > 0) {
            for (let i = 0; i < nodes.length; i++) {
                this.queue.enqueue(nodes[i]);
            }
        }

        this.recursiveTraverse();
    }
}
