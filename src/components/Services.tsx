import React from 'react';
import { motion } from 'motion/react';
import { useFirebase } from '../FirebaseContext';
import { Palette, Stethoscope, TrendingUp } from 'lucide-react';

const iconMap: Record<string, any> = {
  'palette': Palette,
  'stethoscope': Stethoscope,
  'trending-up': TrendingUp,
};

export default function Services() {
  const { services } = useFirebase();

  const defaultServices = [
    {
      id: '1',
      title: '의료 로고 디자인',
      description: '병원의 정체성과 신뢰감을 담은 프리미엄 로고를 제작합니다. 단순한 디자인을 넘어 의료진의 철학을 시각화합니다.',
      icon: 'palette'
    },
    {
      id: '2',
      title: '의료 컨설팅',
      description: '병원 운영의 효율성을 극대화하고 환자 경험을 개선하는 전략적 솔루션을 제공합니다.',
      icon: 'stethoscope'
    },
    {
      id: '3',
      title: '의료 마케팅',
      description: '데이터 기반의 정밀한 타겟팅으로 병원의 브랜드 인지도를 높이고 신규 환자 유입을 최적화합니다.',
      icon: 'trending-up'
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text">병원의 성장을 위한 핵심 서비스</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Palette;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-12 group hover:bg-primary hover:text-white transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-white/20 transition-colors">
                  <Icon size={32} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                <p className="text-text-muted group-hover:text-white/80 leading-relaxed font-medium">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
