import React, { useEffect } from "react";
import p5 from "p5";
import Matter from "matter-js";
import "./PhysicsBox.css";

const PhysicsBox = () => {
    const containerRef = React.useRef();
    const canvasRef = React.useRef();

    useEffect(() => {
        let resizeHandler = null;
        let resizeObserver = null;

        // Matter.js Aliases
        const Engine = Matter.Engine,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Body = Matter.Body,
            Common = Matter.Common,
            Composite = Matter.Composite,
            Svg = Matter.Svg;

        // Common.setDecomp(require('poly-decomp'));

        const engine = Engine.create({ gravity: { x: -1.5, y: 0 } });

        const world = engine.world;
        const shapes = [];

        let ground = containerRef.current.getBoundingClientRect().x; // x position of the left bound
        const boundWidth = 100;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Matter.js Bodies
        const bounds = [
            Bodies.rectangle(width, -boundWidth / 2, width * 3, boundWidth, { isStatic: true }), //top
            Bodies.rectangle(width, height + boundWidth / 2, width * 3, boundWidth, { isStatic: true }), //bottom
            Bodies.rectangle(ground - boundWidth / 2, height / 2, boundWidth, height * 1.5, { isStatic: true }), //left
            Bodies.rectangle(width * 2, height / 2, boundWidth, height * 1.5, { isStatic: true }) //right
        ];

        for (let i = 0; i < 10; i++) {
            shapes.push(Bodies.circle(Math.random() * width * 2, Math.random() * height, 80, { restitution: 0.5 }));
        }
        //shapes.push(Bodies.circle(400, 200, 80, { restitution: 0.9 }));

        Composite.add(world, [...bounds, ...shapes]);

        const sketch = (p) => {

            p.preload = () => {
            };

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight, canvasRef.current);
                canvasRef.current = p.canvas;

                p.background(150);

            };

            p.draw = () => {

                p.background(120);
                p.text(p.width + " x " + p.height, 10, 10);

                Engine.update(engine, 16.666);
                //p.ellipse(shapes[0].position.x, shapes[0].position.y, 160);
                for (let shape of shapes) {
                    p.ellipse(shape.position.x, shape.position.y, 160);
                }


            }

            resizeHandler = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                p.resizeCanvas(width, height);
                ground = containerRef.current.getBoundingClientRect().x;

                Body.setPosition(bounds[0], { x: width, y: -boundWidth / 2 });
                Body.setPosition(bounds[1], { x: width, y: height + boundWidth / 2 });
                Body.setPosition(bounds[2], { x: ground - boundWidth / 2, y: height / 2 });
                Body.setPosition(bounds[3], { x: width * 2, y: height / 2 });
            }

            const updateGround = () => {
                if (!bounds[2]) return;
                ground = containerRef.current.getBoundingClientRect().x;
                Body.setPosition(bounds[2], { x: ground - boundWidth / 2, y: window.innerHeight / 2 });
            }

            resizeObserver = new ResizeObserver((entries) => {
                for (let e of entries) {
                    if (e.target === containerRef.current) {
                        updateGround();
                    }
                }
            });

        };

        const myP5 = new p5(sketch, containerRef.current);
        window.addEventListener('resize', resizeHandler);
        resizeObserver.observe(containerRef.current);

        return () => {
            myP5.remove();
            window.removeEventListener('resize', resizeHandler);
            resizeObserver.disconnect();

        };
    }, []);

    return (
        <div className="canvas-box" ref={containerRef}>
            <canvas className="background-canvas" ref={canvasRef} />
        </div>
    );
}

export default PhysicsBox;