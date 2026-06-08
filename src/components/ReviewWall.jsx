import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { initialReviews } from '../data/memoriesData';

const formFieldVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const reviewCardVariants = {
  hidden:  { opacity: 0, y: -14, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
};

export default function ReviewWall() {
  const [reviews, setReviews] = useState(initialReviews);
  const [name,    setName]    = useState('');
  const [rating,  setRating]  = useState(5);
  const [hover,   setHover]   = useState(0);
  const [text,    setText]    = useState('');
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) { setError('Isi nama dan review terlebih dahulu.'); return; }
    setError('');
    setReviews([
      {
        id: `r-${Date.now()}`,
        name: name.trim(),
        rating,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        text: text.trim(),
      },
      ...reviews,
    ]);
    setName(''); setText(''); setRating(5); setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section id="reviews" className="relative py-20 bg-[#0a0a12]">
      <div className="glow-navy absolute bottom-0 right-0 w-[400px] h-[300px] opacity-30 z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center space-y-2 mb-14"
        >
          <p className="section-label justify-center">Audience Response</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase font-display">
            Friendship Reviews
          </h2>
          <p className="text-[14px] text-[#5a6478] font-light">
            Bagikan ulasan jujur kamu tentang perjalanan kita.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Form ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 bg-[#0f0f1a] border border-white/6 rounded-lg p-6 md:p-8 text-left"
          >
            <motion.h3
              className="text-[15px] font-bold text-white uppercase tracking-tight font-display mb-6"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Write a Review
            </motion.h3>

            <form onSubmit={submit} className="space-y-5">
              {/* Name */}
              <motion.div
                custom={0}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-1.5"
              >
                <label className="text-[10px] font-mono tracking-widest text-[#5a6478] uppercase block">Nama</label>
                <motion.input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nama kamu..."
                  whileFocus={{ borderColor: 'rgba(232,25,44,0.5)', boxShadow: '0 0 0 2px rgba(232,25,44,0.08)' }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-[#080810] border border-white/6 focus:border-[#e8192c]/40 rounded px-4 py-2.5 text-[13px] text-white placeholder:text-[#5a6478] outline-none transition-colors duration-250"
                />
              </motion.div>

              {/* Stars */}
              <motion.div
                custom={1}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-1.5"
              >
                <label className="text-[10px] font-mono tracking-widest text-[#5a6478] uppercase block">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <motion.button
                      key={s} type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(0)}
                      whileHover={{ scale: 1.25, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="cursor-pointer p-0.5"
                    >
                      <Star
                        size={20}
                        className={`transition-colors duration-200 ${(hover || rating) >= s ? 'text-[#f5c518] fill-[#f5c518]' : 'text-[#2a2a3e]'}`}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Review text */}
              <motion.div
                custom={2}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-1.5"
              >
                <label className="text-[10px] font-mono tracking-widest text-[#5a6478] uppercase block">Review</label>
                <motion.textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  rows={4}
                  placeholder="Tulis kenangan favoritmu..."
                  whileFocus={{ borderColor: 'rgba(232,25,44,0.5)', boxShadow: '0 0 0 2px rgba(232,25,44,0.08)' }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-[#080810] border border-white/6 focus:border-[#e8192c]/40 rounded px-4 py-2.5 text-[13px] text-white placeholder:text-[#5a6478] outline-none transition-colors duration-250 resize-none leading-relaxed"
                />
              </motion.div>

              {/* Error */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-[12px] text-red-400 bg-red-500/8 border border-red-500/15 px-3 py-2.5 rounded overflow-hidden"
                  >
                    <AlertCircle size={13} className="shrink-0" /> {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success */}
              <AnimatePresence mode="wait">
                {success && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex items-center gap-2 text-[12px] text-emerald-400 bg-emerald-500/8 border border-emerald-500/15 px-3 py-2.5 rounded overflow-hidden"
                  >
                    <CheckCircle size={13} className="shrink-0" /> Review berhasil dikirim!
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="btn-red w-full justify-center"
                whileHover={{ scale: 1.025, boxShadow: '0 0 24px rgba(232,25,44,0.35)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              >
                <Send size={13} /> Submit Review
              </motion.button>
            </form>
          </motion.div>

          {/* ── Review list ───────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-4 max-h-[560px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {reviews.map((r, idx) => (
                <motion.div
                  key={r.id}
                  variants={reviewCardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ borderColor: 'rgba(255,255,255,0.10)', x: 2 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-lg bg-[#0f0f1a] border border-white/5 transition-colors duration-300 text-left"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="text-[14px] font-bold text-white">{r.name}</h4>
                      <span className="text-[10px] font-mono text-[#5a6478] uppercase tracking-wider">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 shrink-0 pt-0.5">
                      {[1,2,3,4,5].map(s => (
                        <motion.div
                          key={s}
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.02 + s * 0.05, type: 'spring', stiffness: 350 }}
                        >
                          <Star size={11} className={s <= r.rating ? 'text-[#f5c518] fill-[#f5c518]' : 'text-[#2a2a3e]'} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[13px] text-[#a8b3c8] leading-relaxed font-light">"{r.text}"</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
