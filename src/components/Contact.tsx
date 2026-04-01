import React, { useState } from 'react';
import { motion } from 'motion/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', content: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // 1. Send to Formspree
      const response = await fetch('https://formspree.io/f/mgopyelj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Formspree submission failed');

      // 2. Backup to Firestore
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: new Date().toISOString()
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', content: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-text">성장을 위한 첫 걸음</h2>
            <p className="text-text-muted text-lg font-medium leading-relaxed mb-12">
              병원의 브랜드 가치를 높이고 싶으신가요? 
              보해안의 전문가들이 귀하의 병원에 최적화된 솔루션을 제안해 드립니다. 
              문의사항을 남겨주시면 24시간 이내에 전문 컨설턴트가 연락드리겠습니다.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Send size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-muted uppercase tracking-wider">Email</div>
                  <div className="text-lg font-bold text-text">bohaean4252@gmail.com</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 bg-white"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 size={72} className="text-primary mb-8" />
                <h3 className="text-3xl font-bold mb-4 text-text">문의가 성공적으로 접수되었습니다!</h3>
                <p className="text-text-muted font-medium">빠른 시일 내에 전문 컨설턴트가 답변 드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="성함"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="이메일"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Phone</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="연락처"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Subject</label>
                  <input 
                    required
                    type="text" 
                    placeholder="문의 제목"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Message</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="문의 내용을 상세히 입력해주세요"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all resize-none"
                  />
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="w-full py-5 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 shadow-xl shadow-primary/20"
                >
                  {status === 'loading' ? '전송 중...' : '무료 컨설팅 신청하기'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
