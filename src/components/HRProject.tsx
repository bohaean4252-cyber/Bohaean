import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, Users, Layout, Zap } from 'lucide-react';

const hrProjectData = [
  {
    title: '전략적 인재 확보',
    subtitle: 'Strategic Talent Acquisition',
    icon: UserPlus,
    description: '병원의 비전에 부합하는 최적의 인재를 선발하기 위한 정교한 채용 프로세스를 구축합니다.',
    items: ['맞춤형 채용 브랜딩 제작', '직무별 역량 평가 모델링', '전략적 인재 소싱 및 선발 기준']
  },
  {
    title: '체계적 성과 관리',
    subtitle: 'Performance Management',
    icon: Users,
    description: '직원의 성장이 곧 병원의 성장으로 이어지도록 공정하고 투명한 인사 시스템을 설계합니다.',
    items: ['KPI 기반 인사평가 시스템', '직무별 맞춤 교육 커리큘럼', '핵심인재 리텐션 및 퇴사 관리']
  },
  {
    title: '고효율 조직 설계',
    subtitle: 'Organizational Structure',
    icon: Layout,
    description: '원활한 소통과 명확한 책임 소재를 바탕으로 유연하고 강력한 조직 구조를 만듭니다.',
    items: ['최적화된 조직도 및 직급 체계', '원내 커뮤니케이션 프로토콜', '급여 및 복리후생 고도화']
  },
  {
    title: '스마트 워크플로우',
    subtitle: 'Workflow Optimization',
    icon: Zap,
    description: '불필요한 낭비를 제거하고 진료에만 집중할 수 있는 효율적인 업무 환경을 조성합니다.',
    items: ['진료 종류별 표준 운영 절차(SOP)', '디지털 기반 업무 매뉴얼 제작', '직무별 일일 과업 최적화']
  }
];

export default function HRProject() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">HR & CRM Solution</span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text mb-8 leading-[1.1]">
              인건비 리스크를<br />
              <span className="text-primary">성장의 기회로</span> 바꿉니다
            </h2>
            <p className="text-xl text-text-muted font-medium leading-relaxed">
              단순한 인력 관리를 넘어, 직원의 역량을 극대화하는 HR 조직 시스템과 
              CRM 환자 관리 시스템의 결합으로 병원의 생산성을 혁신합니다.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block pb-2"
          >
            <div className="text-8xl font-black text-gray-50 select-none">HR PROJECT</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hrProjectData.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 rounded-[32px] bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon size={32} />
                </div>
                <span className="text-xs font-bold text-gray-300 tracking-widest uppercase pt-2">0{idx + 1}</span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-extrabold text-text mb-2">{item.title}</h3>
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">{item.subtitle}</p>
                <p className="text-text-muted font-medium leading-relaxed">{item.description}</p>
              </div>

              <ul className="space-y-3 pt-6 border-t border-gray-200/50">
                {item.items.map((subItem) => (
                  <li key={subItem} className="flex items-center gap-3 text-sm font-bold text-text/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {subItem}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
