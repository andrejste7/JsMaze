/**
 * Creating menu with menuItems
 * for every algorithm representation
 * slide and initializing the process
 */
MENU.addMenuItem("dfs", MENU_TYPE_DFS)
    .addMenuItem("bfs", MENU_TYPE_BFS)
    .addMenuItem("dijkstra", MENU_TYPE_DIJKSTRA)
    .setActiveMenuItem("dfs")
    .bindEvents()
    .render();