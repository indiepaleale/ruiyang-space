import React, { useEffect, useRef } from "react";
import PhysicsBox from "./PhysicsBox";
import "./Background.css";


const Background = () => {
    return (
        <div className='page-right'>
            <PhysicsBox />

        </div>
    );
}

export default Background;