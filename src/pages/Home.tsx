import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <Services />
      <Stats />
      <Portfolio />
      <Contact />
    </div>
  );
}
