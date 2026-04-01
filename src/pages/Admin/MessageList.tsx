import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Mail, User, Calendar } from 'lucide-react';
import { Message } from '../../types';

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('이 메시지를 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <div className="text-center py-12 opacity-40">로딩 중...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-8">문의 내역</h3>
      
      {messages.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
          <p className="opacity-40">아직 접수된 문의가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="space-y-1">
                  <div className="text-lg font-bold">{msg.subject}</div>
                  <div className="flex flex-wrap gap-4 text-xs opacity-50">
                    <div className="flex items-center gap-1.5"><User size={12} /> {msg.name}</div>
                    <div className="flex items-center gap-1.5"><Mail size={12} /> {msg.email}</div>
                    <div className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(msg.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  className="self-start p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="bg-black/30 p-4 rounded-xl text-sm font-light leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { MessageSquare } from 'lucide-react';
