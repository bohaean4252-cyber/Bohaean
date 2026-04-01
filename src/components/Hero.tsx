import React from 'react';
import { motion } from 'motion/react';
import { useFirebase } from '../FirebaseContext';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { siteConfig } = useFirebase();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Professional Medical Consulting
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-text">
            <span className="block mb-2">{siteConfig?.heroTitle || '보해안'}</span>
            <span className="text-primary">병원의 성장을 디자인하다</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-muted mb-12 font-medium leading-relaxed">
            {siteConfig?.heroSubtitle || '로고 디자인부터 의료 컨설팅, 경영 전략까지. 보해안은 데이터와 디자인으로 병원의 미래를 제시합니다.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact" 
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
            >
              무료 컨설팅 신청
              <ArrowRight size={18} />
            </a>
            <a 
              href="#services" 
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-white border border-gray-200 text-text font-bold hover:bg-gray-50 transition-all"
            >
              서비스 안내
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
