import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import dayjs from 'dayjs';
import { MessageSquare, X } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  message: string;
  created_at: string;
  reply_to?: string | null;
}

const FloatingChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    setMessages(data || []);
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const { error } = await supabase.from('messages').insert([
      {
        sender: 'User',
        message: message.trim(),
        reply_to: replyTo?.id ?? null,
      },
    ]);

    if (!error) {
      setMessage('');
      setReplyTo(null);
      await fetchMessages();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 w-80 max-h-[60vh] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg flex flex-col overflow-hidden z-50">
          <div className="p-3 font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
            Chat with me 👋
            <button onClick={() => setOpen(false)}><X className="w-4 h-4 text-gray-500" /></button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                {msg.reply_to && (
                  <div className="text-xs text-gray-500 italic mb-1">
                    Replying to: {messages.find(m => m.id === msg.reply_to)?.message || '...'}
                  </div>
                )}
                <div className="bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-white px-3 py-2 rounded-xl w-fit max-w-[80%]">
                  {msg.message}
                </div>
                <div className="text-[10px] text-gray-500 mt-1 flex justify-between">
                  {dayjs(msg.created_at).format('HH:mm')}
                  <button
                    onClick={() => setReplyTo(msg)}
                    className="text-blue-500 text-[10px] ml-2 hover:underline"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
            {replyTo && (
              <div className="p-2 border-l-4 border-blue-500 bg-blue-50 text-xs text-gray-700 rounded">
                Replying to: <span className="font-medium">{replyTo.message}</span>
                <button
                  onClick={() => setReplyTo(null)}
                  className="ml-2 text-red-500 hover:underline text-[10px]"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
