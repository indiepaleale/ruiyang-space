import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import Matter, { Body, use } from "matter-js";
import { canvas, div } from "motion/react-client";



const MatterCanvas = forwardRef((props, ref) => {
    const canvasRef = useRef();
    const matterRef = useRef();
    const containerRef = props.containerRef;

    const updateGround = useRef();
    const tick = useRef();

    useImperativeHandle(ref, () => ({
        updateGround: (newGround) => {
            updateGround.current(newGround);
        },
        tick: (delta) => {
            if (tick.current) {
                tick.current(delta);
            }
        },
        canvasRef: canvasRef.current,

    }));


    // useImperativeHandle(ref, () => ({
    //     updateGround: (newGround) => {
    //         set

    useEffect(() => {
        let Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Vertices = Matter.Vertices,
            Svg = Matter.Svg,
            Bodies = Matter.Bodies;

        let engine = Engine.create({ gravity: { x: -1, y: 0 } });
        let world = engine.world;
        let render = Render.create({
            element: containerRef.current,
            canvas: canvasRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'black',
            }
        });

        let width = canvasRef.current.width;
        let height = canvasRef.current.height;
        let ground = containerRef.current.getBoundingClientRect().x;
        const boundWidth = 100;

        const bounds = [
            Bodies.rectangle(width, -boundWidth / 2, width * 3, boundWidth, { isStatic: true }),//top
            Bodies.rectangle(width, height + boundWidth / 2, width * 3, boundWidth, { isStatic: true }),//bottom
            Bodies.rectangle(ground - boundWidth / 2, height / 2, boundWidth, height * 1.5, { isStatic: true }),//left
            Bodies.rectangle(width * 2, height / 2, boundWidth, height * 1.5, { isStatic: true })//right
        ];

        const ball = Bodies.circle(width / 2, height / 2, 100, {
            restitution: 0.9,
            render: {
                fillStyle: 'yellow',
            },
        });

        Composite.add(world, [...bounds, ball]);
        let runner = Runner.create();

        // Render.run(render);
        // Runner.run(runner, engine);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            ground = containerRef.current.getBoundingClientRect().x;
            render.options.width = width;
            render.options.height = height;
            render.canvas.width = width;
            render.canvas.height = height;
            Render.setPixelRatio(render, window.devicePixelRatio);


            Body.setPosition(bounds[0], { x: width, y: -boundWidth / 2 });
            Body.setPosition(bounds[1], { x: width, y: height + boundWidth / 2 });
            Body.setPosition(bounds[2], { x: ground - boundWidth / 2, y: height / 2 });
            Body.setPosition(bounds[3], { x: width * 2, y: height / 2 });


            Render.lookAt(render, {
                min: { x: 0, y: 0 },
                max: { x: window.innerWidth, y: window.innerHeight }
            });

        };

        updateGround.current = (groundPos) => {
            ground = groundPos;
            Body.setPosition(bounds[2], { x: ground - boundWidth / 2, y: height / 2 });
        };

        tick.current = (delta) => {
            Engine.update(engine, delta);
            Render.world(render);
        };


        window.addEventListener('resize', handleResize);



        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(engine.world);
            Engine.clear(engine);
        };

    }, []);

    return (
        <canvas className="matter-canvas" id="mask-canvas" ref={canvasRef}></canvas>
    )

});

export default MatterCanvas;