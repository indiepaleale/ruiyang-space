import React, { useEffect, useRef } from "react";
import p5 from "p5";


export default function P5Background() {
    const renderRef = useRef();

    const sketch = (p) => {
        const gap = 5;
        let x = 0;
        let vx = p.random(0,20);
        let y = 0;
        let vy = p.random(0,20);

        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight).parent(renderRef.current);;
            p.background(20);
        };

        p.draw = () => {
            p.background(20);
            p.ellipse(x, y, 5, 5);

            if (x > p.width || x < 0) vx *= -1;
            if (y > p.height || y < 0) vy *= -1;

            x += vx;
            y += vy;

        }

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    };


    useEffect(() => {
        new p5(sketch);
    }, []);

    return (
        <div
            className="p5"
            ref={renderRef}></div>
    );

}
