import React, { useState } from "react";
import "../styles/Panel.css";

export default function Panel() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className={`page-left ${isHovered ? "expanded" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            left
        </div>
    )
}