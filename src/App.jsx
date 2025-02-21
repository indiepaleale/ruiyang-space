import React from 'react';
import Panel from './components/Panel';
import Background from './components/Background';
import { HashRouter as Router } from 'react-router-dom';
import './styles/LandingPage.css';
import './styles/Fonts.css';
// Use this for BrowserRouter ! Not working with github pages
// May need to configure basename in BrowserRouter
// import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {

  return (
    <div className='landing-page'>
      <Router>
        <Panel />

      </Router>
      <Background />
    </div>
  );
};