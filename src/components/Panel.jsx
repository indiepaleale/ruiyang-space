import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import ProjectPage from "../pages/ProjectPage";
import AboutPage from "../pages/AboutPage";
import { ProjectOverlay } from "./ProjectCard";
import { AnimatePresence } from "motion/react";
import "../styles/Panel.css";


export default function Panel() {
    const location = useLocation();

    return (
        <div className={`page-left`}>
            <Header location={location} />
            <AnimatePresence mode="wait">
                <Routes>
                    <Route index path="/" element={<></>} />
                    <Route path="projects" element={<ProjectPage />} >
                        <Route path=":project" element={<ProjectOverlay />} />
                    </Route>
                    <Route path="about" element={<AboutPage />} />
                </Routes>
            </AnimatePresence>

        </div>
    )
}