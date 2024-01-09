class MenuItem {
    /** @Number */
    slideStrategyType;

    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.name = this.element.dataset.algorithm;
    }

    setSlideStrategyType(type) {
        this.slideStrategyType = type;
        return this;
    }

    render() {
        strategyFactory.create(this.slideStrategyType).render();
    }
}