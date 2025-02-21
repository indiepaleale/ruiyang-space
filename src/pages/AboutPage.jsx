import React from "react";
import PanelAnimatedBox from "../components/PanelAnimatedBox";
import profilePic from "../assets/profile-pic.jpg";
import "../styles/AboutPage.css";

const AboutPage = () => {
    return (
        <PanelAnimatedBox>
            <div className="about-page">
                <img src={profilePic} alt="profile picture" className="profile-pic" />
                <div className="about-text">
                    <h1>About Me</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                        tincidunt, arcu nec vehicula aliquet, diam metus gravida erat, in
                        pharetra metus odio nec libero. Nullam nec purus nec libero
                        bibendum ultricies. Nullam nec purus nec libero bibendum
                        ultricies.
                    </p>
                </div>
            </div>
        </PanelAnimatedBox>
    );
};

export default AboutPage;