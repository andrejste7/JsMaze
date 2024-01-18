class Dfs extends AlgorithmBase {
    constructor() {
        super();

        // array that holds result of DFS
        this.result = [];

        // Springy.js
        this.springy = null;

        this.stack = new Stack();
    }

    traverse(springy) {
        this.springy = springy;

        this.addDfsToSpringy();

        const startNode = this.springy.graph.nodes.find((n) => n.id === 'start');

        let currentNode = startNode;

        this.visit(currentNode);

        while (this.stack.size > 0) {
            currentNode = this.stack.pop();

            if (currentNode) {
                this.visit(currentNode);
            }
        }

        return this.result;
    }

    visit(node) {
        this.result.push(node);
        node.dfs.visited = true;

        const { edgeList } = node.dfs;

        if (!edgeList?.length) {
            return null;
        }

        for (const edge of edgeList) {
            if (!edge.toNode.dfs.visited) {
                const hasValueTo = this.stack.stack.find((x) => x?.id === edge.toNode.id);
                if (edge.fromNode.id === node.id) {
                    edge.toNode.dfs.parent = node;
                }

                if (!hasValueTo) {
                    this.stack.push(edge.toNode);
                }
            }

            if (!edge.fromNode.dfs.visited) {
                if (edge.toNode.id === node.id) {
                    edge.fromNode.dfs.parent = node;
                }

                const hasValueFrom = this.stack.stack.find((x) => x?.id === edge.fromNode.id);
                if (!hasValueFrom) {
                    this.stack.push(edge.fromNode);
                }
            }
        }
    }

    addDfsToSpringy() {
        for (const node of this.springy.graph.nodes) {
            node.dfs = {
                edgeList: [],
                visited: false,
                parent: null,
            };
        }

        for (const edge of this.springy.graph.edges) {
            const fromNodeSpringy = this.springy.graph.nodes.find((x) => x.id === edge.source.id);
            const toNodeSpringy = this.springy.graph.nodes.find((x) => x.id === edge.target.id);

            this.addEdge(new Edge(fromNodeSpringy, toNodeSpringy, 0));
        }
    }

    addEdge(edge) {
        const { nodes } = this.springy.graph;
        edge.fromNode.dfs.edgeList.push(edge);
        edge.toNode.dfs.edgeList.push(edge);

        if (!nodes.find((x) => x.id === edge.fromNode.id)) {
            nodes.push(edge.fromNode);
        }

        if (!nodes.find((x) => x.id === edge.toNode.id)) {
            nodes.push(edge.toNode);
        }
    }
}
