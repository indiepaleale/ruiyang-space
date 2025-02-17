import React from "react";
import { motion } from "motion/react"
import "../styles/PanelAnimatedBox.css";

const PanelAnimatedBox = ({ children }) => {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            exit={{ width: '0px', opacity: 0,transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
            className="panel-animated-box"
        >
            {children}
        </motion.div>

    )
};

export default PanelAnimatedBox;