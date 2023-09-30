/**
 * Apply node mask layer on the maze
 */
const mask = mazeNodeMask.getMaskLayerFromMaze(mazeInstance.maze)
// mask.forEach(e => mazeInstance.maze[e.position.y][e.position.x] = 8)

/**
 * Display the maze
 */
mazeInstance.display("maze_container")

/**
 * Array converted to springy graph. Can
 * be extended used to manipulate or
 * style Springy.js nodes and edges
 * @type {Springy.Graph}
 */
const graph = mazeToSpringyParser.arrayToSpringy(mask)

/**
 * Initializing Springy.js renderer to
 * display created graph from array of
 * nodes
 * @type {jQuery|jQuery|*}
 */
const springy = $('#cnv-graph').springy({
  graph: graph,
  nodeSelected: function(node) {}
})

/**
 * Traversing maze with the BFS
 */
const bfs = new Bfs(springy)
const result = bfs.traverse()

for (let i = 0; i < result.length; i++) {
  setTimeout(() => {
    // Visualize on graph
    result[i].data.highlight = true
    const element = $('#cnv-result')
    element.text(element.text() + ' ' + result[i].data.label)

    // Visualize on maze
    $(`#maze_container div[data-id="${result[i].id}"]`).addClass("path")
  }, i * 100)
  if (i === result.length - 1) {
    setTimeout(() => {
      alert(`Result was found in ${result.length} iterations!`)
    }, i * 105)
  }
}