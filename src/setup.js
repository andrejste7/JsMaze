/**
 * Start with the placeholder for
 * maze object, so it can be used throughout
 * the script
 * @type {?Maze}
 */
let maze = null;

/**
 * Allows to substitute slide
 * strategies for swapping with new
 * strategies
 * @type {SlideStrategyFactory}
 */
const strategyFactory = new SlideStrategyFactory();

/**
 * Allows to recreate whole rendering
 * process for every menu item activation
 * @type {MenuItemFactory}
 */
const menuItemFactory = new MenuItemFactory();

/**
 * Creating main menu used
 * along the whole project
 * @type {Menu}
 */
const MENU = new Menu();