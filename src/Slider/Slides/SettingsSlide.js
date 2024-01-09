class UISettingsSlide extends Slidable {
    constructor(inputId, buttonId, callback, onShow = () => {}) {
        super(buttonId, callback);

        this.inputElement = document.getElementById(inputId);
        this.inputRepeaterElement = document.getElementById(`${inputId}-repeater`);
        this.onShow = onShow;

        this.mazeSettings = new MazeSettings();
        this.mazeSettings.mazeSize = 10;
        this.inputElement.value = this.mazeSettings.mazeSize;
        this.inputRepeaterElement.innerHTML = this.mazeSettings.mazeSize.toString();
    }

    show() {
        super.show(() => {
            this.onShow(this);
            this.bindEvents();
        });
    }

    bindEvents() {
        super.bindEvents();

        this.inputElement.addEventListener('keydown', (event) => {
            event.preventDefault();
        });
        this.inputElement.addEventListener('input', (event) => {
            const value = this.mazeSettings.validateMazeSize(event.target.value);
            this.mazeSettings.mazeSize = parseInt(value);
            this.inputElement.value = value;
            this.inputRepeaterElement.innerHTML = value;
        });
    }
}