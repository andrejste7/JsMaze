class Slider {
    /** @type Slide[] */
    slides = []
    /** @type Slide */
    currentSlide;
    /** @type Slide */
    lastSlide;
    /** @type Number */
    count= 0;

    addSlide(slide) {
        this.slides.push(slide);

        if (this.count === 0) {
            this.currentSlide = slide;
            this.lastSlide = slide;
        } else {
            this.lastSlide.nextSlide = slide;
            slide.prevSlide = this.lastSlide;
            this.lastSlide = slide;
        }

        slide.position = this.count;
        this.count++;
    }

    rearrangeSlides() {
        const count = (this.count - 1) * 50 - (100 * this.currentSlide.position);
        this.slides.forEach((slide) => {
            slide.sliderElement.style.transform = `translateX(${count}%)`;

            if (slide.stepElements !== null) {
                slide.stepElements.forEach((element, _) => {
                    element.classList.remove('active');
                });

                if (slide.position < this.currentSlide.position) {
                    slide.stepElements.forEach((element, _) => {
                        element.classList.add('active');
                    });
                }
            }
        });

        this.currentSlide.slideContent.show();
    }

    setupSlides() {
        this.rearrangeSlides();
    }

    nextSlide() {
        if (this.currentSlide.nextSlide !== null) {
            this.currentSlide = this.currentSlide.nextSlide;
            this.rearrangeSlides();
        }
    }

    hideSlides() {
        this.slides.forEach((slide) => {
            if (slide.nextSlide !== null) {
                slide.sliderElement.style.opacity = "0";
            }
        });
    }

    showSlides() {
        setTimeout(() => {
            this.slides.forEach((slide) => {
                slide.sliderElement.style.opacity = "1";
            });
        }, 200);
    }
}