import React, { useEffect, useRef } from 'react';
import Panel from '../components/Panel';
import Background from '../components/background';
import PhysicsBox from '../components/PhysicsBox';

export default function LandingPage() {

  return (
    <div className='landing-page'>
      <Panel />
      <Background />
    </div>
  );
};
