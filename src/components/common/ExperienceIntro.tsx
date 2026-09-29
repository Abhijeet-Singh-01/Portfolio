import React, { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const startupLines=['INITIALIZING...','LOADING EXPERIENCE...','READY'];

export const ExperienceIntro: React.FC = () => {
  const reduced=usePrefersReducedMotion();
  const [visible,setVisible]=useState(!reduced);
  const [phase,setPhase]=useState(0);
  useEffect(()=>{
    if(reduced)return;
    const phaseOne=window.setTimeout(()=>setPhase(1),240);
    const phaseTwo=window.setTimeout(()=>setPhase(2),500);
    const dismiss=window.setTimeout(()=>setVisible(false),850);
    return ()=>{window.clearTimeout(phaseOne);window.clearTimeout(phaseTwo);window.clearTimeout(dismiss);};
  },[reduced]);
  if(!visible||reduced)return null;
  return <div className="experience-intro" role="status" aria-live="polite">
    <div className="intro-mark" aria-hidden="true">AS</div>
    <p>{startupLines[phase]}</p>
    <span className="intro-progress" aria-hidden="true"><i style={{width:`${(phase+1)*33.333}%`}} /></span>
    <button type="button" onClick={()=>setVisible(false)}>Skip intro</button>
  </div>;
};
