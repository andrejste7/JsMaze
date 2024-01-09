class Slide {
    /** @type Slide */
    nextSlide= null;
    /** @type Slide */
    prevSlide= null;
    /** @type Slidable */
    slideContent = null;
    /** @type Number */
    position= 0;

    /**
     * @param params
     * @param {String} params.sliderId
     * @param {?String} params.stepId
     * @param {Slidable} params.slideContent
     */
    constructor(params = {}) {
        this.slideContent = params.slideContent;
        this.sliderElement = document.getElementById(params.sliderId);

        this.stepElements = params.sliderId
            ? document.querySelectorAll(`#${params.stepId} .activatable`)
            : null;
    }
}