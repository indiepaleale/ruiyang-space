import React, { useEffect } from "react";
import p5 from "p5";
import Matter from "matter-js";
import "../styles/PhysicsBox.css";

const PhysicsBox = () => {
    const p5InstanceRef = React.useRef();
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

        for (let i = 0; i < 20; i++) {
            shapes.push(Bodies.circle(Math.random() * width * 2, Math.random() * height, Math.random() * 100 + 50, { restitution: 0.5 }));
        }

        Composite.add(world, [...bounds, ...shapes]);

        const sketch = (p) => {

            let img1;
            let layerText1;
            let layerText2;
            let layerMask;
            let font;

            const drawText = (ctx, text, yOff) => {
                ctx.background(255);
                ctx.textSize(360);
                ctx.textFont(font);
                ctx.textAlign(p.LEFT, p.BASELINE);
                ctx.fill(0);
                ctx.text(text, 10, yOff);
            }

            p.preload = () => {
                font = p.loadFont("src/assets/SpaceGrotesk-Bold.ttf", undefined, (err) => console.log(err));
            };

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL, canvasRef.current);
                canvasRef.current = p.canvas;

                p.background(255);
                p.noStroke();
                p.textFont(font);

                layerText1 = p.createGraphics(p.width, p.height);
                layerText2 = p.createGraphics(p.width, p.height);
                layerMask = p.createGraphics(p.width, p.height);
                layerMask.pixelDensity(2);
                layerText1.pixelDensity(2);
                layerText2.pixelDensity(2);

                drawTextLayer();

                img1 = p.createImage(p.width, p.height);

            };

            p.draw = () => {
                Engine.update(engine, 16.666);

                p.translate(-p.width / 2, -p.height / 2);
                layerMask.clear();
                layerMask.background(0, 0, 0, 0);
                // drawText(layerText1, "Hello");
                // drawText(layerText2, "World");

                layerMask.fill('pink');
                layerMask.noStroke();
                layerMask.push();
                layerMask.translate(-ground, 0);
                for (let shape of shapes) {
                    layerMask.ellipse(shape.position.x, shape.position.y, shape.circleRadius * 2);
                }
                layerMask.pop();
                p.background(255);
                p.translate(ground, 0);
                p.image(layerText1, 0, 0)



                img1.copy(layerText2, 0, 0, layerText1.width, layerText1.height, 0, 0, img1.width, img1.height);
                img1.mask(layerMask);
                img1.blend(layerMask, 0, 0, layerText1.width, layerText1.height, 0, 0, img1.width, img1.height, p.DIFFERENCE);
                p.image(img1, 0, 0);
                // p.image(layerText1, 0, 0);

                //p.ellipse(shapes[0].position.x, shapes[0].position.y, 160);


            }

            resizeHandler = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                p.resizeCanvas(width, height);
                layerText1.resizeCanvas(width, height);
                layerText2.resizeCanvas(width, height);

                drawTextLayer();
                layerMask.resizeCanvas(width, height);
                img1 = p.createImage(p.width, p.height);

                ground = containerRef.current.getBoundingClientRect().x;

                Body.setPosition(bounds[0], { x: width, y: -boundWidth / 2 });
                Body.setPosition(bounds[1], { x: width, y: height + boundWidth / 2 });
                Body.setPosition(bounds[2], { x: ground - boundWidth / 2, y: height / 2 });
                Body.setPosition(bounds[3], { x: width * 2, y: height / 2 });
            }

            const drawTextLayer = () => {
                drawText(layerText1, "Ruiyang", layerText1.height / 2);
                drawText(layerText2, "Wang", layerText2.height / 2);
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

        p5InstanceRef.current = new p5(sketch, containerRef.current);
        window.addEventListener('resize', resizeHandler);
        resizeObserver.observe(containerRef.current);

        return () => {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
                p5InstanceRef.current = null;
            }
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