class MenuItemType {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

class Menu {
    /** @type MenuItemType[] */
    menuItemTypes = [];
    /** @type MenuItemType */
    currentMenuItemType;

    addMenuItem(name, type) {
        this.menuItemTypes.push(new MenuItemType(name, type));
        return this;
    }

    setActiveMenuItem(name) {
        this.currentMenuItemType = this.menuItemTypes.find(item => item.name === name);
        this.menuItemTypes.forEach((item) => {
            document.getElementById(item.name).classList.remove('active');
        });
        document.getElementById(this.currentMenuItemType.name).classList.add('active');
        return this;
    }

    render() {
        menuItemFactory.create(this.currentMenuItemType.type).render();
        return this;
    }

    bindEvents() {
        this.menuItemTypes.forEach((item) => {
            document.getElementById(item.name).addEventListener('click', (event) => {
                event.preventDefault();
                this.setActiveMenuItem(event.target.dataset.algorithm);
                this.render();
            });
        });
        return this;
    }
}