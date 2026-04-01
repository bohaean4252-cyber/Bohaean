import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-bold tracking-tighter mb-6 block">
              <span className="blue-gradient bg-clip-text text-transparent">보해안</span>
              <span className="text-xs font-light tracking-widest opacity-50 uppercase ml-2">Bohaean</span>
            </Link>
            <p className="max-w-sm text-white/40 font-light leading-relaxed">
              프리미엄 의료 컨설팅 및 경영 지원 전문 브랜드. 
              병원의 전문성을 시각화하고 성장을 가속화하는 최상의 파트너가 되어드립니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#services" className="hover:text-primary transition-colors">서비스</a></li>
              <li><a href="#stats" className="hover:text-primary transition-colors">성과</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">포트폴리오</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">문의하기</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-[10px] uppercase tracking-widest opacity-30">
          <div>© 2026 BOHAEAN. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
