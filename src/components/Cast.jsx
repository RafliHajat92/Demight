import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { friends } from '../data/memoriesData';

/* ─── Card ───────────────────────────────────────────────────────── */
function CastCard({ f, i }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [5, -5]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-5, 5]), { stiffness: 260, damping: 28 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ scale: 1.05, zIndex: 20 }}
      transition={{ duration: 0.28 }}
      className="relative shrink-0 w-[200px] h-[280px] rounded-2xl overflow-hidden cursor-pointer select-none"
    >
      {/* Photo */}
      <motion.img
        src={f.avatar}
        alt={f.name}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ filter: hovered ? 'brightness(0.6) saturate(0.8)' : 'brightness(0.75) saturate(0.85)' }}
      />

      {/* Permanent subtle bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Red border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ boxShadow: hovered ? 'inset 0 0 0 1.5px rgba(232,25,44,0.6), 0 0 30px rgba(232,25,44,0.15)' : 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
        transition={{ duration: 0.3 }}
      />

      {/* Number — always visible, faint */}
      <div className="absolute top-3 right-3 text-[10px] font-mono text-white/25 font-bold">
        {String(i + 1).padStart(2, '0')}
      </div>

      {/* Name + Role — slide up on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-4 pb-4"
        initial={false}
        animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Red line */}
        <div className="w-6 h-[2px] rounded-full bg-[#e8192c] mb-2" />
        {f.origin && (
          <div className="flex items-center mb-1">
            <span className="text-[10px] font-mono tracking-widest text-[#e8192c] uppercase">{f.origin}</span>
          </div>
        )}
        <h3 className="text-[13px] font-extrabold text-white uppercase tracking-tight leading-tight font-display">
          {f.nickname}
        </h3>
      </motion.div>
    </motion.div>
  );
}

/* ─── Infinite Marquee ───────────────────────────────────────────── */
function MarqueeTrack({ isPaused }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  const items = [...friends, ...friends, ...friends];

  useAnimationFrame(() => {
    if (isPaused || !trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth / 3;
    let cur = x.get() - 0.65;
    if (Math.abs(cur) >= trackWidth) cur = 0;
    x.set(cur);
  });

  return (
    <div
      className="overflow-hidden w-full"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex gap-4 w-max py-6"
      >
        {items.map((f, i) => (
          <CastCard key={`${f.id}-${i}`} f={f} i={i % friends.length} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function Cast() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="cast" className="relative py-20 bg-[#080810] overflow-hidden">
      {/* BG glow */}
      <div className="glow-red absolute -bottom-20 left-0 w-[500px] h-[500px] opacity-8 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-end justify-between mb-10"
        >
          <div className="space-y-1.5">
            <p className="section-label">Starring</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase font-display">
              Cast &amp; Crew
            </h2>
          </div>

          {/* Pause dot */}
          <button
            onClick={() => setIsPaused(p => !p)}
            className="flex items-center gap-2 text-[11px] font-mono text-[#3a4558] hover:text-[#e8192c] transition-colors duration-200"
          >
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isPaused ? 'bg-[#e8192c]' : 'bg-white/20'}`} />
            {isPaused ? 'resume' : 'pause'}
          </button>
        </motion.div>
      </div>

      {/* Track — full bleed */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <MarqueeTrack isPaused={isPaused} />
      </div>
    </section>
  );
}
