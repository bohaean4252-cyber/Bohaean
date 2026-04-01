import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useFirebase } from '../FirebaseContext';
import { loginWithGoogle, logout } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useFirebase();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '홈', href: '/' },
    { name: '서비스', href: '#services' },
    { name: '성과', href: '#stats' },
    { name: '포트폴리오', href: '#portfolio' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="blue-gradient bg-clip-text text-transparent">보해안</span>
          <span className="text-xs font-bold tracking-widest opacity-40 uppercase text-text">Bohaean</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold text-text hover:text-primary transition-colors opacity-70 hover:opacity-100"
            >
              {link.name}
            </a>
          ))}
          
          {isAdmin && (
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <LayoutDashboard size={20} className="text-primary" />
            </Link>
          )}

          <button 
            onClick={() => window.location.href = '#contact'}
            className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            상담 신청
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-text" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-text"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-primary font-bold">
                  <LayoutDashboard size={20} />
                  <span>관리자 대시보드</span>
                </Link>
              )}
              <button 
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '#contact';
                }}
                className="w-full bg-primary text-white px-6 py-4 rounded-2xl justify-center font-bold shadow-lg shadow-primary/20"
              >
                상담 신청하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
