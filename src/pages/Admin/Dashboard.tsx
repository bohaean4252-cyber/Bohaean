import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Briefcase, 
  BarChart3, 
  Image as ImageIcon, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Save, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useFirebase } from '../../FirebaseContext';
import { db, logout } from '../../lib/firebase';
import { doc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { cn } from '../../lib/utils';
import MessageList from './MessageList';

export default function AdminDashboard() {
  const { siteConfig, services, stats, portfolio, isAdmin } = useFirebase();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('config');

  if (!isAdmin) return <div className="p-20 text-center">접근 권한이 없습니다.</div>;

  const tabs = [
    { id: 'config', name: '사이트 설정', icon: Settings },
    { id: 'services', name: '서비스 관리', icon: Briefcase },
    { id: 'stats', name: '성과 데이터', icon: BarChart3 },
    { id: 'portfolio', name: '포트폴리오', icon: ImageIcon },
    { id: 'messages', name: '문의 내역', icon: MessageSquare },
  ];

  return (
    <div className="pt-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex flex-col gap-2">
            <h2 className="text-xl font-bold mb-6 px-4">관리자 패널</h2>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                  activeTab === tab.id ? "bg-primary text-white" : "hover:bg-white/5 text-white/60"
                )}
              >
                <tab.icon size={18} />
                {tab.name}
              </button>
            ))}
            <button 
              onClick={() => { logout(); navigate('/'); }}
              className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={18} />
              로그아웃
            </button>
          </aside>

          {/* Content Area */}
          <main className="flex-1 glass-card p-8 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'config' && <ConfigEditor config={siteConfig} />}
                {activeTab === 'services' && <ServiceManager services={services} />}
                {activeTab === 'stats' && <StatManager stats={stats} />}
                {activeTab === 'portfolio' && <PortfolioManager portfolio={portfolio} />}
                {activeTab === 'messages' && <MessageList />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

// Sub-components for Admin

function ConfigEditor({ config }: { config: any }) {
  const [formData, setFormData] = useState(config || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (config) setFormData(config); }, [config]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'config', 'main'), formData);
      alert('설정이 저장되었습니다.');
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-8">사이트 기본 설정</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase opacity-40">Hero Title</label>
          <input 
            type="text" 
            value={formData.heroTitle || ''} 
            onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase opacity-40">Hero Subtitle</label>
          <input 
            type="text" 
            value={formData.heroSubtitle || ''} 
            onChange={(e) => setFormData({...formData, heroSubtitle: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase opacity-40">Contact Email</label>
          <input 
            type="email" 
            value={formData.contactEmail || ''} 
            onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase opacity-40">Instagram URL</label>
          <input 
            type="text" 
            value={formData.instagramUrl || ''} 
            onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
          />
        </div>
      </div>
      <button 
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 bg-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/80 transition-all disabled:opacity-50"
      >
        <Save size={18} />
        {saving ? '저장 중...' : '설정 저장'}
      </button>
    </div>
  );
}

function ServiceManager({ services }: { services: any[] }) {
  const [newService, setNewService] = useState({ title: '', description: '', icon: 'palette' });

  const handleAdd = async () => {
    if (!newService.title || !newService.description) return;
    try {
      await addDoc(collection(db, 'services'), newService);
      setNewService({ title: '', description: '', icon: 'palette' });
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try { await deleteDoc(doc(db, 'services', id)); } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold">서비스 관리</h3>
      
      <div className="bg-white/5 p-6 rounded-2xl space-y-4">
        <h4 className="font-bold text-sm opacity-60 uppercase tracking-widest">새 서비스 추가</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="서비스 명" 
            value={newService.title}
            onChange={(e) => setNewService({...newService, title: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
          />
          <select 
            value={newService.icon}
            onChange={(e) => setNewService({...newService, icon: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
          >
            <option value="palette">Palette (Design)</option>
            <option value="stethoscope">Stethoscope (Medical)</option>
            <option value="trending-up">Trending Up (Marketing)</option>
          </select>
        </div>
        <textarea 
          placeholder="서비스 설명" 
          value={newService.description}
          onChange={(e) => setNewService({...newService, description: e.target.value})}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary resize-none"
          rows={3}
        />
        <button onClick={handleAdd} className="flex items-center gap-2 bg-primary px-6 py-2 rounded-xl font-bold hover:bg-primary/80 transition-all">
          <Plus size={18} /> 추가하기
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <div className="font-bold">{service.title}</div>
              <div className="text-xs opacity-40">{service.icon}</div>
            </div>
            <button onClick={() => handleDelete(service.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatManager({ stats }: { stats: any[] }) {
  const [newStat, setNewStat] = useState({ label: '', value: 0, suffix: '', description: '' });

  const handleAdd = async () => {
    if (!newStat.label) return;
    try {
      await addDoc(collection(db, 'stats'), { ...newStat, value: Number(newStat.value) });
      setNewStat({ label: '', value: 0, suffix: '', description: '' });
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try { await deleteDoc(doc(db, 'stats', id)); } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold">성과 데이터 관리</h3>
      
      <div className="bg-white/5 p-6 rounded-2xl space-y-4">
        <h4 className="font-bold text-sm opacity-60 uppercase tracking-widest">새 데이터 추가</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            placeholder="라벨 (예: 매출 상승)" 
            value={newStat.label}
            onChange={(e) => setNewStat({...newStat, label: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
          />
          <input 
            type="number"
            placeholder="값" 
            value={newStat.value}
            onChange={(e) => setNewStat({...newStat, value: Number(e.target.value)})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
          />
          <input 
            placeholder="접미사 (예: %)" 
            value={newStat.suffix}
            onChange={(e) => setNewStat({...newStat, suffix: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
          />
        </div>
        <input 
          placeholder="설명" 
          value={newStat.description}
          onChange={(e) => setNewStat({...newStat, description: e.target.value})}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
        />
        <button onClick={handleAdd} className="flex items-center gap-2 bg-primary px-6 py-2 rounded-xl font-bold hover:bg-primary/80 transition-all">
          <Plus size={18} /> 추가하기
        </button>
      </div>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <div className="font-bold">{stat.label}: {stat.value}{stat.suffix}</div>
              <div className="text-xs opacity-40">{stat.description}</div>
            </div>
            <button onClick={() => handleDelete(stat.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioManager({ portfolio }: { portfolio: any[] }) {
  const [newItem, setNewItem] = useState({ title: '', category: '', imageUrl: '', description: '' });

  const handleAdd = async () => {
    if (!newItem.title || !newItem.imageUrl) return;
    try {
      await addDoc(collection(db, 'portfolio'), newItem);
      setNewItem({ title: '', category: '', imageUrl: '', description: '' });
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try { await deleteDoc(doc(db, 'portfolio', id)); } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold">포트폴리오 관리</h3>
      
      <div className="bg-white/5 p-6 rounded-2xl space-y-4">
        <h4 className="font-bold text-sm opacity-60 uppercase tracking-widest">새 프로젝트 추가</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="프로젝트 명" 
            value={newItem.title}
            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
          />
          <input 
            placeholder="카테고리 (예: Logo Design)" 
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
          />
        </div>
        <input 
          placeholder="이미지 URL" 
          value={newItem.imageUrl}
          onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
        />
        <button onClick={handleAdd} className="flex items-center gap-2 bg-primary px-6 py-2 rounded-xl font-bold hover:bg-primary/80 transition-all">
          <Plus size={18} /> 추가하기
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolio.map((item) => (
          <div key={item.id} className="group relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/5">
            <img src={item.imageUrl} className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex justify-end">
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <div>
                <div className="font-bold text-sm">{item.title}</div>
                <div className="text-[10px] uppercase opacity-60">{item.category}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
