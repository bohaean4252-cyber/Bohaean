import React from 'react';
import { motion } from 'motion/react';
import { useFirebase } from '../FirebaseContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Stats() {
  const { stats } = useFirebase();

  const defaultStats = [
    { id: '1', label: '컨설팅 후 매출 상승', value: 150, suffix: '%', description: '평균적인 병원 매출 성장률' },
    { id: '2', label: '병원 로고 제작', value: 200, suffix: '+', description: '전국 병원 및 의원 로고 제작 실적' },
    { id: '3', label: '마케팅 효율 개선', value: 85, suffix: '%', description: '광고비 대비 전환율 향상' },
    { id: '4', label: '고객 만족도', value: 98, suffix: '%', description: '서비스 이용 고객 재계약 의사' },
    { id: '5', label: '누적 프로젝트', value: 500, suffix: '+', description: '다양한 의료 분야 프로젝트 수행' },
    { id: '6', label: '전문 인력', value: 25, suffix: '명', description: '분야별 최고의 전문가 그룹' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section id="stats" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Data-Driven Success</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-text">수치로 증명하는 전문성</h2>
            <p className="text-text-muted text-lg font-medium leading-relaxed mb-12">
              보해안은 단순한 감각이 아닌, 철저한 데이터 분석을 바탕으로 최상의 결과를 도출합니다. 
              우리의 성과는 고객사의 성장으로 증명됩니다.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {displayStats.map((stat, index) => (
                <div key={stat.id} className="flex flex-col gap-1">
                  <div className="text-3xl md:text-4xl font-extrabold text-primary">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm font-bold text-text uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xs text-text-muted font-medium">{stat.description}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[400px] glass-card p-8 bg-white"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  stroke="#00000040" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#00000060', fontWeight: 600 }}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#00000005' }}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderColor: '#00000010', 
                    borderRadius: '12px',
                    color: '#1a1a1a',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#0070f3', fontWeight: 700 }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {displayStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0070f3' : '#00d4ff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
