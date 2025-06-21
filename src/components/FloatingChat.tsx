import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Ganti dengan URL dan anon key dari Supabase kamu
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL!, import.meta.env.VITE_SUPABASE_ANON_KEY!);

interface Message {
  id: string;
  sender: string;
  message: string;
  created_at: string;
}

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel('realtime-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await supabase.from('messages').insert({ sender: 'guest', message: input });
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl w-80 h-96 shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Live Chat</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg px-3 py-2 max-w-[70%] text-sm ${
                    msg.sender === 'guest'
                      ? 'bg-blue-100 text-blue-800 self-end ml-auto'
                      : 'bg-gray-200 text-gray-700 self-start'
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>

            <div className="p-2 border-t dark:border-gray-700">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="w-full rounded-lg border dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChat;
