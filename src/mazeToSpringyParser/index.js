class MazeToSpringyParser {
  constructor(mazeSize) {
    this.higherBoundry = mazeSize * 2
    this.lowerBoundry = 0
  }

  /**
   * Builds node name|label based
   * on it position in matrix and
   * sets start and end node names
   * @param node
   * @returns {string}
   */
  buildNodeName(node) {
    if (node.position.y === this.lowerBoundry ||
        node.position.x === this.lowerBoundry)
      return 'start'

    if (node.position.y === this.higherBoundry ||
        node.position.x === this.higherBoundry)
      return 'end'

    return `${node.position.y}-${node.position.x}`
  }

  /**
   * Converts an array of node info
   * into a Springy.js graph
   * @param array
   * @returns {Springy.Graph}
   */
  arrayToSpringy(array) {
    const springyGraph = new Springy.Graph()

    // Build nodes first
    array.forEach((node) => {
      let nodeName = this.buildNodeName(node)

      springyGraph.addNodes(nodeName)
      springyGraph.nodeSet[nodeName].data.node = node
    })

    // Build edges or connections between every node
    array.forEach((node) => {
      let fromNodeName = this.buildNodeName(node)

      node.neighbours.forEach((neighbour) => {
        let toNodeName = this.buildNodeName(neighbour)

        if (fromNodeName === 'end' || fromNodeName === toNodeName) return

        springyGraph.addEdges([fromNodeName, toNodeName, {
          color: '#00A0B0',
          directional: true}])
      })
    })

    return springyGraph
  }
}