import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useFirebase } from '../FirebaseContext';
import { generateHospitalImage } from '../lib/imageGen';

export default function Portfolio() {
  const { portfolio } = useFirebase();
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  const defaultPortfolio = [
    { id: '1', title: '서울 소재 한방병원', category: 'Logo Design', prompt: 'Modern hospital architecture exterior, glass and steel, daytime, blue sky, professional photography' },
    { id: '2', title: '광주 소재 치과', category: 'Logo Design', prompt: 'Minimalist dental clinic interior, white and bright, modern medical equipment, clean aesthetic' },
    { id: '3', title: '광주 소재 한방병원', category: 'Branding', prompt: 'Traditional Korean medicine hospital interior, warm wood textures, herbal medicine cabinets, cozy atmosphere' },
  ];

  useEffect(() => {
    const loadImages = async () => {
      const images: Record<string, string> = {};
      for (const item of defaultPortfolio) {
        // Use a unique timestamp to force fresh generation and avoid caching
        const timestamp = Date.now();
        const url = await generateHospitalImage(`${item.prompt}, unique_id: ${item.id}_${timestamp}`);
        images[item.id] = url;
      }
      setGeneratedImages(images);
    };
    loadImages();
  }, []);

  const displayPortfolio = portfolio.length > 0 ? portfolio : defaultPortfolio.map(item => ({
    ...item,
    imageUrl: generatedImages[item.id] || `https://picsum.photos/seed/${item.id}_hospital/800/600`
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
