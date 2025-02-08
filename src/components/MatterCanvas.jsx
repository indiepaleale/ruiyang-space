import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import Matter, { Body, use } from "matter-js";
import { canvas, div } from "motion/react-client";



const MatterCanvas = forwardRef((props, ref) => {
    const canvasRef = useRef();
    const matterRef = useRef();
    const containerRef = props.containerRef;

    const canvas2Ref = useRef();

    canvas2Ref.current = document.createElement('canvas');

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
        canvas2Ref: canvas2Ref.current,
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
        let render1 = Render.create({
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
        let render2 = Render.create({
            element: containerRef.current,
            canvas: canvas2Ref.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'black',
            }
        });

        let width = canvas2Ref.current.width;
        let height = canvas2Ref.current.height;
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
            render1.options.width = width;
            render1.options.height = height;
            render1.canvas.width = width;
            render1.canvas.height = height;
            Render.setPixelRatio(render1, window.devicePixelRatio);


            Body.setPosition(bounds[0], { x: width, y: -boundWidth / 2 });
            Body.setPosition(bounds[1], { x: width, y: height + boundWidth / 2 });
            Body.setPosition(bounds[2], { x: ground - boundWidth / 2, y: height / 2 });
            Body.setPosition(bounds[3], { x: width * 2, y: height / 2 });


            Render.lookAt(render1, {
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
            Render.world(render1);
            Render.world(render2);
        };


        window.addEventListener('resize', handleResize);



        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render1);
            Runner.stop(runner);
            Composite.clear(engine.world);
            Engine.clear(engine);
        };

    }, []);

    return (
        <div>
            <div className='layer1'>
                <div className="background-text">LAYER1</div>
                <canvas className="matter-canvas" id="mask-canvas" ref={canvasRef}></canvas>
            </div>
            {/* <div className='layer2'>
                <div>LAYER2</div>
                <canvas className="matter-canvas" id="mask-canvas" ref={canvasRef}></canvas>

            </div> */}
        </div>


    )

});

export default MatterCanvas;