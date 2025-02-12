import React, { useEffect, useRef } from 'react';
import Panel from '../components/Panel';
import Background from '../components/Background';
import '../styles/LandingPage.css';

export default function LandingPage() {

  return (
    <div className='landing-page'>
      <Panel />
      <Background />
    </div>
  );
};
