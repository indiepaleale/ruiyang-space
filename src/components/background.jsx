import React, { useEffect, useRef } from "react";
import MatterCanvas from "./MatterCanvas";
import "./Background.css";
import { use } from "matter-js";

const Background = () => {
    const matterContainer = useRef();

    const childRef = useRef();


    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let e of entries) {
                if (e.target === matterContainer.current) {
                    const groundNew = matterContainer.current.getBoundingClientRect().x;
                    if (childRef.current) {
                        childRef.current.updateGround(groundNew);
                    }
                }
            }
        });

        resizeObserver.observe(matterContainer.current);

        const update = (delta) => {
            if (childRef.current) {
                childRef.current.tick(8.33333);
            }


            requestAnimationFrame(() => update(delta));
        }
        update();

        return () => {
            resizeObserver.disconnect();
        };
    }, []);


    return (
        <div className='page-right' ref={matterContainer}>
            <MatterCanvas ref={childRef} containerRef={matterContainer} />

        </div>
    );
}

export default Background;