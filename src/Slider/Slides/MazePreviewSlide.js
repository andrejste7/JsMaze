class MazePreviewSlide extends Slidable {
    constructor(buttonId, callback, onShow = () => {}) {
        super(buttonId, callback);
        this.onShow = onShow;
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