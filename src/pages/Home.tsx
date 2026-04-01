import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HRProject from '../components/HRProject';
import Stats from '../components/Stats';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <Services />
      <HRProject />
      <Stats />
      <Portfolio />
      <Contact />
    </div>
  );
}
