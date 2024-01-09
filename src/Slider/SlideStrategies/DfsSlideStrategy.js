class DfsSlideStrategy extends SlideStrategy {
    /** @type Slider */
    slider

    constructor(slider) {
        super();

        this.slider = slider;
    }

    render(callback) {
        super.render(() => {
            /**
             * Initially loaded slide
             * for displaying maze settings
             */
            this.slider.addSlide(
                new Slide({
                    sliderId: 'setup-slide',
                    stepId: 'first-step',
                    slideContent: new UISettingsSlide(
                        'size',
                        'make-maze-demo-btn',
                        (UiSettingsSlide) => {
                            // On the very first slide we are
                            // creating a new Maze instance
                            // with specific sizes
                            maze = new Maze(UiSettingsSlide.mazeSettings.mazeSize);
                            this.slider.nextSlide();
                        },
                        () => {
                            // Showing next slide to ensure
                            // more beauty sliding. Re-enable at repeat
                            this.slider.showSlides();
                        },
                    ),
                }),
            );

            /**
             * Maze previewing slide to
             * display maze with or without
             * the NodeMask
             */
            this.slider.addSlide(
                new Slide({
                    sliderId: 'maze-preview-slide',
                    stepId: 'second-step',
                    slideContent: new MazePreviewSlide(
                        'make-graph-btn',
                        (mazePreviewSlide) => {
                            this.slider.nextSlide();
                        },
                        () => {
                            // Here we are just showing preview after its ready
                            maze.show('maze_preview_container').then(() => {});
                        },
                    ),
                }),
            );

            /**
             * Graph displaying slide to
             * visualize maze traversing
             * algorithm with graph
             */
            this.slider.addSlide(
                new Slide({
                    sliderId: 'graph-slide',
                    stepId: 'third-step',
                    slideContent: new GraphSlide(
                        'make-maze-btn',
                        (graphSlide) => {
                            graphSlide.buttonElement.classList.add("hidden");
                            this.slider.nextSlide();
                        },
                        (graphSlide) => {
                            // Re-rendering SpringyUI canvas
                            // because otherwise it will
                            // produce a weird visual glitch
                            // when previous results overlaps current
                            const springyElement = document.getElementById('cnv-graph');
                            springyElement.replaceWith(springyElement.cloneNode(true));
                            const springy = $('#cnv-graph').springy({
                                graph: maze.mazeToSpringyParser.arrayToSpringy(maze.mask),
                                nodeSelected: function(node) {},
                            });

                            // Actually simulating the maze
                            // traversing to get the result
                            const mazeSolvingAlgorithm = maze.mazeSolvingAlgorithm;
                            const result = mazeSolvingAlgorithm.traverse(springy);

                            for (let i = 0; i < result.length; i++) {
                                setTimeout(() => {
                                    result[i].data.highlight = true;
                                }, i * 100);
                                if (i === result.length - 1) {
                                    setTimeout(() => {
                                        graphSlide.buttonElement.classList.remove("hidden");

                                        // Saving up springy and the
                                        // result in the Maze instance
                                        // to use in the next steps
                                        maze.setSpringy(springy);
                                        maze.setResult(result);
                                    }, i * 105);
                                }
                            }
                        },
                    ),
                }),
            );

            /**
             * Maze displaying slide to
             * show maze traversing
             * algorithm in action
             */
            this.slider.addSlide(
                new Slide({
                    sliderId: 'maze-slide',
                    stepId: 'fourth-step',
                    slideContent: new MazeSlide(
                        'repeat-btn',
                        (mazeSlide) => {
                            // Hide the button after changing the slide
                            mazeSlide.buttonElement.classList.add("hidden");
                            this.slider.nextSlide();
                        },
                        (mazeSlide) => {
                            maze.show('maze_container')
                                .then(() => {
                                    // Here we are taking the result of the maze traversing
                                    // to show it this time on the maze itself
                                    // P.S. check maze object to check all available options
                                    const result = maze.result;

                                    // Make magic happen here
                                    for (let i = 0; i < result.length; i++) {
                                        setTimeout(() => {
                                            $(`#maze_container div[data-id="${result[i].id}"]`).addClass('path');
                                        }, i * 100);
                                        if (i === result.length - 1) {
                                            setTimeout(() => {
                                                mazeSlide.buttonElement.classList.remove("hidden");
                                            }, i * 105);
                                        }
                                    }
                                });
                        },
                    ),
                }),
            );

            /**
             * Last slide that allows to
             * switch algorithm or just to
             * repeat the process from the
             * start
             */
            this.slider.addSlide(
                new Slide({
                    sliderId: 'repeat-slide',
                    slideContent: new RepeatSlide(
                        'reset-btn',
                        () => {
                            MENU.setActiveMenuItem(MENU.currentMenuItemType.name).render();
                        },
                        (repeatSlide) => {
                            repeatSlide.resultsElement.innerHTML = `Labirints ${maze.mazeSize}x${maze.mazeSize}, izmantojot DFS tika atrisināts ar ${maze.result.length.toString()} soļiem`;

                            // Hiding previous slide to ensure
                            // more beauty sliding. Re-enable at settings
                            this.slider.hideSlides();
                        },
                    ),
                }),
            );

            this.slider.setupSlides();
        });
    }
}