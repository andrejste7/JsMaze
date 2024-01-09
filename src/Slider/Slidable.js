/**
 * Interface simulation for implementing
 * slide logic
 */
class Slidable {
    constructor(buttonId, callback) {
        this.buttonElement = document.getElementById(buttonId);
        this.callback = callback;
    }

    bindEvents() {
        this.buttonElement.replaceWith(this.buttonElement.cloneNode(true));
        this.buttonElement = document.getElementById(this.buttonElement.id);
        this.buttonElement.addEventListener('click', this.onClick)
    }

    onClick = (event) => {
        event.preventDefault();
        this.callback(this);
    }

    show(callback) { callback(); }
}