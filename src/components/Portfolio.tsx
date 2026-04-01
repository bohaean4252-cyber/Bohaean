import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useFirebase } from '../FirebaseContext';
import { generateHospitalImage } from '../lib/imageGen';

export default function Portfolio() {
  const { portfolio } = useFirebase();
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  const defaultPortfolio = [
    { 
      id: '1', 
      title: '서울 소재 프리미엄 한방병원', 
      category: 'Management Support', 
      prompt: 'Modern hospital architecture exterior, glass and steel, daytime, blue sky, professional photography, high-end medical building',
      fallback: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=600'
    },
    { 
      id: '2', 
      title: '강남 소재 대형 치과', 
      category: 'Interior Design', 
      prompt: 'Minimalist dental clinic interior, white and bright, modern medical equipment, clean aesthetic, luxury dental office',
      fallback: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800&h=600'
    },
    { 
      id: '3', 
      title: '광주 소재 전문 한방병원', 
      category: 'Total Consulting', 
      prompt: 'Traditional Korean medicine hospital interior, warm wood textures, herbal medicine cabinets, cozy atmosphere, modern clinic',
      fallback: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800&h=600'
    },
  ];

  useEffect(() => {
    const loadImages = async () => {
      const itemsToLoad = portfolio.length > 0 ? portfolio : defaultPortfolio;
      const images: Record<string, string> = {};
      
      for (const item of itemsToLoad) {
        if (!generatedImages[item.id]) {
          try {
            const timestamp = Date.now();
            const searchPrompt = (item as any).prompt || `${item.title} hospital medical facility`;
            const url = await generateHospitalImage(`${searchPrompt}, unique_id: ${item.id}_${timestamp}`);
            images[item.id] = url;
          } catch (err) {
            console.error(`Failed to generate image for ${item.id}:`, err);
          }
        }
      }
      
      if (Object.keys(images).length > 0) {
        setGeneratedImages(prev => ({ ...prev, ...images }));
      }
    };
    loadImages();
  }, [portfolio]);

  const displayPortfolio = (portfolio.length > 0 ? portfolio : defaultPortfolio).map(item => ({
    ...item,
    imageUrl: (item as any).imageUrl || generatedImages[item.id] || (item as any).fallback || `https://images.unsplash.com/photo-1586773860418-d374a551f393?auto=format&fit=crop&q=80&w=800&h=600`
  }));

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text">성공적인 파트너십</h2>
          </div>
          <p className="max-w-md text-text-muted font-medium leading-relaxed">
            보해안이 진행한 프리미엄 의료 브랜드 디자인 및 컨설팅 프로젝트입니다. 
            각 병원의 고유한 가치를 담아낸 결과물을 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayPortfolio.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-3">{item.category}</span>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
