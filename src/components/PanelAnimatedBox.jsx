import React from "react";
import { motion } from "motion/react"
import "../styles/PanelAnimatedBox.css";

const PanelAnimatedBox = ({ children }) => {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            exit={{ width: 'px', opacity: 0, transition: { duration: 3 } }}
            transition={{ duration: 0.3 }}
            className="panel-animated-box"
        >
            {children}
        </motion.div>

    )
};

export default PanelAnimatedBox;