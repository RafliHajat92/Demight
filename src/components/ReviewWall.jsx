import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Users, MoreVertical } from 'lucide-react';
import { initialReviews } from '../data/memoriesData';

const chatBubbleVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.5, transformOrigin: 'bottom left' },
  visible: (i) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      delay: i * 0.1, 
      type: 'spring', 
      stiffness: 220, 
      damping: 14,
      mass: 0.8
    } 
  })
};

const myBubbleVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.5, transformOrigin: 'bottom right' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 250, 
      damping: 16,
      mass: 0.8
    } 
  }
};

// Generate a random color for avatars/names based on string
const getColor = (name) => {
  const colors = ['text-red-400', 'text-blue-400', 'text-emerald-400', 'text-purple-400', 'text-amber-400', 'text-pink-400', 'text-cyan-400'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function ReviewWall() {
  const [messages, setMessages] = useState(() => 
    [...initialReviews].reverse().map(r => ({
      ...r,
      isMe: false, 
      time: r.date 
    }))
  );
  
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      text: text.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, newMessage]);
    setText('');
  };

  return (
    <section id="reviews" className="relative py-24 bg-[#080810] flex flex-col items-center overflow-hidden">
      
      {/* ── Background Animations ── */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.02, 0.08, 0.02], rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-dashed border-white/10 rounded-full pointer-events-none"
      />

      <div className="w-full max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] font-mono tracking-[0.25em] text-[#5a6478] uppercase mb-3">Live Responses</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-display">
            The Chatroom
          </h2>
        </motion.div>

        {/* Chat Interface Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-2xl border border-white/10 bg-[#0a0a12]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[600px] relative"
        >
          
          {/* Chat Header */}
          <div className="h-16 border-b border-white/5 bg-[#12121a]/90 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Demight Members</h3>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                </p>
              </div>
            </div>
            <button className="text-[#5a6478] hover:text-white transition-colors cursor-pointer">
              <MoreVertical size={18} />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth relative z-10"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  custom={index}
                  variants={msg.isMe ? myBubbleVariants : chatBubbleVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  layout
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} w-full`}
                >
                  <div className={`flex items-end gap-2.5 max-w-[85%] md:max-w-[75%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    {!msg.isMe && (
                      <div className="w-8 h-8 rounded-full bg-white/5 shrink-0 flex items-center justify-center border border-white/10 mb-1 shadow-lg">
                        <span className="text-[11px] font-bold text-white uppercase">{msg.name.charAt(0)}</span>
                      </div>
                    )}

                    {/* Bubble */}
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className={`relative px-4 py-3 rounded-2xl shadow-md ${
                      msg.isMe 
                        ? 'bg-gradient-to-br from-white to-gray-200 text-[#0a0a12] rounded-br-sm' 
                        : 'bg-gradient-to-br from-[#1a1a24] to-[#12121a] border border-white/5 text-white rounded-bl-sm'
                    }`}>
                      {!msg.isMe && (
                        <div className={`text-[11px] font-bold mb-1 tracking-wide ${getColor(msg.name)}`}>
                          {msg.name}
                        </div>
                      )}
                      <p className="text-[13px] leading-relaxed break-words whitespace-pre-wrap">{msg.text}</p>
                      <div className={`text-[9px] mt-2 text-right font-mono ${msg.isMe ? 'text-[#5a6478]' : 'text-[#7a8498]'}`}>
                        {msg.time}
                      </div>
                    </motion.div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-[#12121a]/90 backdrop-blur-md border-t border-white/5 shrink-0 z-20">
            <form onSubmit={submit} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu..."
                  className="w-1/3 max-w-[120px] md:max-w-[150px] bg-[#0a0a12] border border-white/10 rounded-full px-4 py-2.5 text-[12px] text-white placeholder:text-[#5a6478] outline-none focus:border-white/30 transition-colors"
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="w-full bg-[#0a0a12] border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-[13px] text-white placeholder:text-[#5a6478] outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!name.trim() || !text.trim()}
                    className="absolute right-1.5 top-1.5 bottom-1.5 w-8 rounded-full bg-white flex items-center justify-center text-black disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Send size={14} className={name.trim() && text.trim() ? "ml-0.5" : ""} />
                  </button>
                </div>
              </div>
            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
