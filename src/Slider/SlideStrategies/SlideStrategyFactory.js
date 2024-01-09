const STRATEGY_TYPE_DFS = 0;
const STRATEGY_TYPE_BFS = 1;
const STRATEGY_TYPE_DIJKSTRA = 2;

class SlideStrategyFactory {
    create(type) {
        /** @var {SlideStrategy} strategy */
        let strategy;

        switch (type) {
            case STRATEGY_TYPE_DFS:
                strategy = new DfsSlideStrategy(new Slider());
                break;
            case STRATEGY_TYPE_BFS:
                strategy = new BfsSlideStrategy(new Slider());
                break;
            case STRATEGY_TYPE_DIJKSTRA:
                strategy = new DijkstraSlideStrategy(new Slider());
                break;
            default:
                strategy = new DfsSlideStrategy(new Slider());
                break;
        }

        return strategy;
    }
}