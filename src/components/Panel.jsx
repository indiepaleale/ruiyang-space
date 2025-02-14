import React, { useState } from "react";
import Header from "./header";
import ProjectPage from "../pages/ProjectPage";
import AboutPage from "../pages/AboutPage";
import { AnimatePresence } from "framer-motion";
import "../styles/Panel.css";
import PanelAnimatedBox from "./PanelAnimatedBox";

const views = [
    { key: '1', headerItem: "Home", content: null },
    { key: '2', headerItem: "Projects", content: <ProjectPage /> },
    { key: '3', headerItem: "About", content: <AboutPage /> },
];

export default function Panel() {
    const [currentView, setCurrentView] = useState("home");

    return (
        <div className={`page-left`}>
            <Header items={views} selectedItem={currentView} onSelect={setCurrentView} />
            <AnimatePresence mode="wait">
                {views.map((view, index) => (
                    currentView === view.headerItem.toLowerCase() &&
                    <PanelAnimatedBox key={view.key}>
                        {view.content}
                    </PanelAnimatedBox>
                ))}
            </AnimatePresence>

        </div>
    )
}