const MENU_TYPE_DFS = 0;
const MENU_TYPE_BFS = 1;
const MENU_TYPE_DIJKSTRA = 2;

class MenuItemFactory {
    create(type) {
        /** @var {MenuItem} menuItem */
        let menuItem;

        switch (type) {
            case MENU_TYPE_DFS:
                menuItem = new MenuItem('dfs').setSlideStrategyType(MENU_TYPE_DFS)
                break;
            case MENU_TYPE_BFS:
                menuItem = new MenuItem('bfs').setSlideStrategyType(MENU_TYPE_BFS)
                break;
            case MENU_TYPE_DIJKSTRA:
                menuItem = new MenuItem('dijkstra').setSlideStrategyType(MENU_TYPE_DIJKSTRA)
                break;
            default:
                menuItem = new MenuItem('dfs').setSlideStrategyType(MENU_TYPE_DFS)
                break;
        }

        return menuItem;
    }
}