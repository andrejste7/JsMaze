class DijkstraSlideStrategy extends SlideStrategy {
    /** @type Slider */
    slider;

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
                            // with specific sizes and algorithm
                            maze = new Maze(UiSettingsSlide.mazeSettings.mazeSize, true);
                            maze.setAlgorithm(new Dijkstra());
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
                            graphSlide.buttonElement.classList.add('hidden');
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
                                nodeSelected: function (node) {},
                            });

                            // Actually simulating the maze
                            // traversing to get the result
                            const mazeSolvingAlgorithm = maze.mazeSolvingAlgorithm;
                            const result = mazeSolvingAlgorithm.traverse(springy);

                            springy.graph.edges.forEach((edge) => {
                                const nodeFrom = edge.source;
                                const nodeTo = edge.target;
                                const reversedEdge = springy.graph.edges.find(
                                    (x) => x.source.id === nodeTo.id && x.target.id === nodeFrom.id,
                                );

                                if (!reversedEdge) {
                                    return;
                                }

                                if (reversedEdge.data?.label > 0) {
                                    return;
                                }

                                edge.data.label = edge.data.distance;
                            });

                            for (let i = 0; i < result.length; i++) {
                                setTimeout(() => {
                                    result[i].data.highlight = true;
                                }, i * 100);
                                if (i === result.length - 1) {
                                    setTimeout(() => {
                                        graphSlide.buttonElement.classList.remove('hidden');

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
                            mazeSlide.buttonElement.classList.add('hidden');
                            this.slider.nextSlide();
                        },
                        (mazeSlide) => {
                            maze.show('maze_container').then(() => {
                                let timerIds = [];
                                const display = (id = 'end') => {
                                    const nodes = maze.mazeSolvingAlgorithm.getPath(id);
                                    const size = 33;
                                    const lastNodeIndex = nodes.length - 1;
                                    nodes.forEach((node, i) => {
                                        const timerId = setTimeout(() => {
                                            $(`#maze_container div[data-id="${node.id}"]`).addClass('path path-ds');

                                            node.data.node.neighbours.forEach((n) => {
                                                let baseX = Math.abs(n.position.y - node.data.node.position.y) / 2;
                                                let baseY = Math.abs(n.position.x - node.data.node.position.x) / 2;
                                                if (baseX <= 0) baseX = 1;
                                                if (baseY <= 0) baseY = 1;
                                                let element = $(`#maze_container div[data-id="${node.id}"]`);

                                                const nodeDirection = n.direction;

                                                if (nodeDirection === Directions.top) {
                                                    element.append(
                                                        `<span style='height: ${baseX * size}px; top: calc(50% - ${
                                                            baseX * size
                                                        }px);' class="${n.direction}">`,
                                                    );
                                                } else if (nodeDirection === Directions.bottom) {
                                                    element.append(
                                                        `<span style='height: ${baseX * size}px;' class='${
                                                            n.direction
                                                        }'>`,
                                                    );
                                                } else if (nodeDirection === Directions.left) {
                                                    element.append(
                                                        `<span style='width: ${baseY * size}px; left: calc(50% - ${
                                                            baseY * size
                                                        }px);' class='${n.direction}'>`,
                                                    );
                                                } else {
                                                    element.append(
                                                        `<span style='width: ${baseY * size}px;' class='${
                                                            n.direction
                                                        }'>`,
                                                    );
                                                }
                                            });
                                        }, i * 100);

                                        if (i === lastNodeIndex) {
                                            let timerId;
                                            let startNode = nodes[lastNodeIndex];
                                            let j = i;

                                            while (true) {
                                                const nodeId = startNode.id;

                                                if (nodeId === 'start') {
                                                    timerId = setTimeout(() => {
                                                        const element = $(`#maze_container div[data-id="${nodeId}"]`);
                                                        element.addClass('result');
                                                        element.append(`<span class='exit entrance bottom'>`);
                                                        mazeSlide.buttonElement.classList.remove('hidden');
                                                        displayResult(nodes);
                                                    }, j * 101);

                                                    timerIds.push(timerId);

                                                    break;
                                                }

                                                timerId = setTimeout(() => {
                                                    $(`#maze_container div[data-id="${nodeId}"]`).addClass('result');
                                                }, j * 100);

                                                timerIds.push(timerId);

                                                startNode.data.node.neighbours.forEach((n) => {
                                                    const { x, y } = nodes[0].data.node.position;
                                                    if (
                                                        (x === n.position.x && y === n.position.y) ||
                                                        (startNode.dijkstra.parent.data.node.position.x ===
                                                            n.position.x &&
                                                            startNode.dijkstra.parent.data.node.position.y ===
                                                                n.position.y)
                                                    ) {
                                                        let baseX =
                                                            Math.abs(n.position.y - startNode.data.node.position.y) / 2;
                                                        let baseY =
                                                            Math.abs(n.position.x - startNode.data.node.position.x) / 2;
                                                        if (baseX <= 0) baseX = 1;
                                                        if (baseY <= 0) baseY = 1;

                                                        timerId = setTimeout(() => {
                                                            const nodeDirection = n.direction;
                                                            const element = $(
                                                                `#maze_container div[data-id="${nodeId}"]`,
                                                            );

                                                            if (nodeDirection === Directions.top) {
                                                                element.append(
                                                                    `<span style='height: ${
                                                                        baseX * size
                                                                    }px; top: calc(50% - ${
                                                                        baseX * size
                                                                    }px);' class='result ${nodeDirection}'>`,
                                                                );
                                                            } else if (nodeDirection === Directions.bottom) {
                                                                element.append(
                                                                    `<span style='height: ${
                                                                        baseX * size
                                                                    }px;' class='result ${nodeDirection}'>`,
                                                                );
                                                            } else if (nodeDirection === Directions.left) {
                                                                element.append(
                                                                    `<span style='width: ${
                                                                        baseY * size
                                                                    }px; left: calc(50% - ${
                                                                        baseY * size
                                                                    }px);' class='result ${nodeDirection}'>`,
                                                                );
                                                            } else {
                                                                element.append(
                                                                    `<span style='width: ${
                                                                        baseY * size
                                                                    }px;' class='result ${nodeDirection}'>`,
                                                                );
                                                            }
                                                        }, j * 100);

                                                        timerIds.push(timerId);
                                                        j++;
                                                    }
                                                });

                                                startNode = startNode.dijkstra.parent;
                                            }
                                        }

                                        timerIds.push(timerId);
                                    });
                                };

                                const displayResult = (nodes) => {
                                    const child = document.getElementById('ds-results');

                                    if (child) {
                                        return;
                                    }
                                    const nodeCount = nodes.length;
                                    const parent = document.getElementById('maze_container');
                                    const div = document.createElement('div');
                                    div.id = 'ds-results';

                                    div.style = `color:#fff; 
                                            position: absolute; 
                                            width:${parent.offsetWidth}px; 
                                            text-align: center; 
                                            margin-top:10px `;

                                    div.innerHTML = `Mērķis sasniegts ar ${nodeCount} soļiem ar distanci no sākuma līdz beigām: ${
                                        nodes[nodeCount - 1].dijkstra.distance
                                    }`;

                                    parent.appendChild(div);
                                };

                                const clearResult = () => {
                                    const child = document.getElementById('ds-results');
                                    if (!child) {
                                        return;
                                    }

                                    document.getElementById('maze_container').removeChild(child);
                                };

                                const clear = () => {
                                    clearResult();

                                    // Removes ongoing timeouts
                                    for (const timerId of timerIds) {
                                        clearTimeout(timerId);
                                    }
                                    timerIds = [];

                                    // Removes styling from results
                                    $(`#maze div div.path`).removeClass('path-ds');
                                    $(`#maze div div.path`).removeClass('result');
                                    for (const direction of Object.values(Directions)) {
                                        $(`#maze div div.path`).children(`.${direction}`).remove();
                                    }
                                };

                                $('#maze div div.path').on('click', (e) => {
                                    clear();
                                    display(e.currentTarget.dataset.id);
                                });

                                display();
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
                            repeatSlide.resultsElement.innerHTML = `Labirints ${maze.mazeSize}x${
                                maze.mazeSize
                            }, izmantojot DIJKSTRA tika iziets ar ${maze.result.length.toString()} soļiem un distanci no sākuma līdz beigām: ${
                                maze.result[maze.result.length - 1].dijkstra.distance
                            }`;

                            this.slider.hideSlides();
                        },
                    ),
                }),
            );

            this.slider.setupSlides();
        });
    }
}
