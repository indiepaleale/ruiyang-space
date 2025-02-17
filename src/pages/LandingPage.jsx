import React, { useEffect, useRef } from 'react';
import Panel from '../components/Panel';
import Background from '../components/Background';
import '../styles/LandingPage.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

export default function LandingPage() {

  return (

    <div className='landing-page'>
      <Router>
        <Panel />

      </Router>
      <Background />
    </div>
  );
};
