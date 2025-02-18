import React from 'react';
import Panel from './components/Panel';
import Background from './components/Background';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/LandingPage.css';

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