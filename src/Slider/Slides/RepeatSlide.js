class RepeatSlide extends Slidable {
    constructor(buttonId, callback, onShow = () => {}) {
        super(buttonId, callback);
        this.onShow = onShow;

        this.resultsElement = document.getElementById('results');
    }

    show() {
        super.show(() => {
            this.onShow(this);
            this.bindEvents();
        });
    }

    bindEvents() {
        super.bindEvents();
    }
}