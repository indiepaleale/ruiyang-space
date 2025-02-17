import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./header";
import ProjectPage from "../pages/ProjectPage";
import AboutPage from "../pages/AboutPage";
import { AnimatePresence } from "motion/react";
import "../styles/Panel.css";
import PanelAnimatedBox from "./PanelAnimatedBox";

const views = [
    { key: 'home', headerItem: "Home", path: "/", content: null },
    { key: 'projects', headerItem: "Projects", path: "/project/*", content: <ProjectPage /> },
    { key: 'about', headerItem: "About", path: "/about", content: <AboutPage /> },
];

export default function Panel() {
    const location = useLocation();

    return (
        <div className={`page-left`}>
            <Header location={location} />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {views.map((view, index) => (
                        <Route
                            key={view.key}
                            path={view.path}
                            element={view.content}>
                        </Route>
                    ))}
                </Routes>
            </AnimatePresence>

        </div>
    )
}