import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { memories } from '../data/memoriesData';

const featured = memories.filter(m => m.featured);

export default function Hero({ onOpenMemory }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const current = featured[index];

  const go = useCallback((next) => {
    const n = (next + featured.length) % featured.length;
    setDir(next > index ? 1 : -1);
    setIndex(n);
  }, [index]);

  useEffect(() => {
    const t = setTimeout(() => go(index + 1), 7000);
    return () => clearTimeout(t);
  }, [index, go]);

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#080810]">

      {/* ── BG Image ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={current.id + '-bg'}
            src={current.image}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.32) saturate(0.85)' }}
          />
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080810]/75 via-transparent to-transparent" />
      </div>

      {/* Glow */}
      <div className="glow-red absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-20 z-0 pointer-events-none" />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl space-y-5"
          >
            {/* Label row */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#e8192c] uppercase font-bold">
                Featured
              </span>
              <span className="text-[#2a2a3a]">·</span>
              <span className="text-[9px] font-mono tracking-[0.15em] text-[#3a4558] uppercase">
                {current.year}
              </span>
              <span className="text-[#2a2a3a]">·</span>
              <span className="text-[9px] font-mono tracking-[0.15em] text-[#3a4558] uppercase">
                {current.location}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95] font-display">
              {current.title}
            </h1>

            {/* One-line synopsis */}
            <p className="text-[14px] text-white/40 font-light max-w-md leading-relaxed">
              {current.synopsis.split('.')[0]}.
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-4 pt-1"
            >
              <button
                onClick={() => onOpenMemory(current.id)}
                className="btn-red"
              >
                <Play size={13} className="fill-white" />
                Recall Memory
              </button>

              {/* Slide counter */}
              <span className="text-[11px] font-mono text-white/25 tracking-widest">
                {String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Nav: arrows + dots ───────────────────────────────────── */}
        <div className="absolute bottom-24 right-6 md:right-12 flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => go(index - 1)}
              className="w-8 h-8 rounded-full glass-sm flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => go(index + 1)}
              className="w-8 h-8 rounded-full glass-sm flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-1.5">
            {featured.map((_, i) => (
              <button key={i} onClick={() => go(i)}>
                <motion.div
                  animate={{ width: i === index ? 20 : 4, opacity: i === index ? 1 : 0.25 }}
                  transition={{ duration: 0.3 }}
                  className="h-[3px] rounded-full bg-[#e8192c]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        key={current.id + '-progress'}
        className="absolute bottom-0 left-0 h-[2px] bg-[#e8192c]/60 z-20"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 7, ease: 'linear' }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#080810] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
