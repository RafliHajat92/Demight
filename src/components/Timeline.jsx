import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { seasons } from '../data/memoriesData';

/* ── Photo mapping per season ─────────────────────────────────── */
const SEASON_PHOTOS = {
  'sem-1': [
    '/images/cast/adit.jpg',
    '/images/cast/bagas.jpg',
    '/images/cast/citra.jpg',
    '/images/cast/dewo.jpg',
  ],
  'sem-2': [
    '/images/memories/warkop-filosofi.jpg',
    '/images/cast/citra.jpg',
    '/images/cast/bagas.jpg',
  ],
  'sem-3': [
    '/images/memories/mountain-conquest.jpg',
    '/images/memories/final-exam.jpg',
    '/images/cast/dewo.jpg',
    '/images/cast/adit.jpg',
  ],
  'sem-4': [
    '/images/memories/late-night-rice.jpg',
    '/images/memories/dieng.jpg',
    '/images/cast/bagas.jpg',
    '/images/cast/dewo.jpg',
  ],
  'sem-5': [
    '/images/memories/pantai.jpg',
    '/images/cast/citra.jpg',
    '/images/cast/bagas.jpg',
    '/images/cast/adit.jpg',
  ],
  'sem-6': [
    '/images/memories/late-night-rice.jpg',
    '/images/memories/warkop-filosofi.jpg',
    '/images/cast/dewo.jpg',
    '/images/cast/citra.jpg',
  ],
  'sem-7': [
    '/images/memories/mountain-conquest.jpg',
    '/images/memories/dieng.jpg',
    '/images/cast/adit.jpg',
    '/images/cast/bagas.jpg',
  ],
  'sem-8': [
    '/images/memories/pantai.jpg',
    '/images/memories/final-exam.jpg',
    '/images/cast/citra.jpg',
    '/images/cast/dewo.jpg',
  ],
};

/* ─── Lightbox ───────────────────────────────────────────────────── */
function PhotoLightbox({ src, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      <motion.img
        src={src}
        alt=""
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

/* ─── Photo Mosaic ───────────────────────────────────────────────── */
function PhotoMosaic({ season }) {
  const [lightbox, setLightbox] = useState(null);
  const photos = SEASON_PHOTOS[season.id] || [];

  const layouts = [
    // 4 photos: 1 big left + 3 small right
    [
      { gridColumn: '1', gridRow: '1 / 3' },
      { gridColumn: '2', gridRow: '1' },
      { gridColumn: '3', gridRow: '1' },
      { gridColumn: '2 / 4', gridRow: '2' },
    ],
    // 3 photos: 2 top + 1 bottom wide
    [
      { gridColumn: '1 / 2', gridRow: '1' },
      { gridColumn: '2 / 4', gridRow: '1' },
      { gridColumn: '1 / 4', gridRow: '2' },
    ],
    // 2 photos: side by side
    [
      { gridColumn: '1 / 2', gridRow: '1 / 3' },
      { gridColumn: '2 / 4', gridRow: '1 / 3' },
    ],
  ];

  const count = Math.min(photos.length, 4);
  const layout = count >= 4 ? layouts[0] : count === 3 ? layouts[1] : layouts[2];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={season.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Season info — super minimal */}
          <p className="text-[9px] font-mono tracking-[0.2em] text-[#e8192c] uppercase mb-1">
            {season.period}
          </p>
          <h3 className="text-xl font-extrabold text-white uppercase tracking-tight font-display mb-5">
            {season.title}
          </h3>

          {/* Photo grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 120px)',
              gap: 6,
            }}
          >
            {photos.slice(0, count).map((src, pi) => (
              <motion.div
                key={pi}
                style={layout[pi]}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: pi * 0.07, duration: 0.35 }}
                onClick={() => setLightbox(src)}
                className="relative overflow-hidden rounded-lg cursor-zoom-in group"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: 'brightness(0.85) saturate(0.9)' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-lg border border-[#e8192c]/0 group-hover:border-[#e8192c]/40 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Episode titles — tiny */}
          <div className="mt-5 flex flex-col gap-2">
            {season.episodes.map((ep, ei) => (
              <div key={ep.id} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#e8192c] shrink-0" />
                <span className="text-[11px] text-white/40 font-mono">{ep.date}</span>
                <span className="text-[11px] text-white/70 truncate">{ep.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <PhotoLightbox src={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ─── 3D Drum ────────────────────────────────────────────────────── */
const CARD_H  = 90;
const VISIBLE = 5;

function Drum({ active, onSelect }) {
  const total     = seasons.length;
  const faceAngle = 360 / total;
  const radius    = Math.round((CARD_H * total) / (2 * Math.PI));

  return (
    <div
      className="relative mx-auto shrink-0"
      style={{ width: 280, height: CARD_H * VISIBLE, perspective: 900 }}
    >
      {/* Fade edges */}
      <div className="absolute inset-x-0 top-0 h-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0a0a12, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a0a12, transparent)' }} />

      {/* Selection highlight band */}
      <div className="absolute inset-x-4 z-10 pointer-events-none rounded-lg"
        style={{
          top: '50%', transform: 'translateY(-50%)',
          height: CARD_H,
          border: '1px solid rgba(232,25,44,0.3)',
          background: 'rgba(232,25,44,0.05)',
        }}
      />

      {/* Drum body */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: CARD_H }}
          animate={{ rotateX: active * faceAngle }}
          transition={{ type: 'spring', stiffness: 190, damping: 28 }}
        >
          {seasons.map((sem, i) => {
            const angle    = -(i * faceAngle);
            const isActive = i === active;

            return (
              <div
                key={sem.id}
                onClick={() => onSelect(i)}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: CARD_H,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backfaceVisibility: 'hidden',
                  transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                  cursor: 'pointer',
                }}
              >
                <div style={{ textAlign: 'center', transition: 'opacity 0.3s', opacity: isActive ? 1 : 0.25 }}>
                  <p style={{
                    fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: isActive ? '#e8192c' : '#3a4558',
                    marginBottom: 3,
                  }}>
                    {sem.period}
                  </p>
                  <p style={{
                    fontSize: isActive ? 17 : 13,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: isActive ? '#ffffff' : '#4a5568',
                    transition: 'font-size 0.3s',
                    fontFamily: 'var(--font-display, sans-serif)',
                  }}>
                    {sem.title}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function Timeline() {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive(a => Math.max(0, a - 1)), []);
  const next = useCallback(() => setActive(a => Math.min(seasons.length - 1, a + 1)), []);

  return (
    <section id="seasons" className="relative py-8 md:py-24 bg-[#0a0a12] overflow-hidden">
      <div className="glow-red absolute -top-20 -right-20 w-[400px] h-[400px] opacity-6 z-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-10 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-1 md:mb-14 space-y-0"
        >
          <p className="section-label">Perjalanan</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase font-display leading-none mt-0">
            Seasons
          </h2>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center">

          {/* LEFT — drum only on mobile, drum+controls on desktop */}
          <div className="flex flex-col items-center shrink-0">
            <Drum active={active} onSelect={setActive} />

            {/* Arrows + Dots — desktop only */}
            <div className="hidden md:flex flex-col items-center gap-4 mt-4">
              <div className="flex gap-3">
                <motion.button onClick={prev} disabled={active === 0}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/4 flex items-center justify-center
                             text-white/40 hover:text-white hover:border-[#e8192c]/40 disabled:opacity-20 transition-colors">
                  <ChevronUp size={15} />
                </motion.button>
                <motion.button onClick={next} disabled={active === seasons.length - 1}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/4 flex items-center justify-center
                             text-white/40 hover:text-white hover:border-[#e8192c]/40 disabled:opacity-20 transition-colors">
                  <ChevronDown size={15} />
                </motion.button>
              </div>
              <div className="flex gap-1.5">
                {seasons.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    style={{
                      width: i === active ? 14 : 4, height: 4, borderRadius: 9999,
                      background: i === active ? '#e8192c' : 'rgba(255,255,255,0.1)',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — photo mosaic */}
          <div className="flex-1 min-w-0 w-full">
            <PhotoMosaic season={seasons[active]} />

            {/* Arrows + Dots — mobile only, after photo */}
            <div className="flex md:hidden items-center justify-between mt-4">
              <div className="flex gap-1.5">
                {seasons.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    style={{
                      width: i === active ? 14 : 4, height: 4, borderRadius: 9999,
                      background: i === active ? '#e8192c' : 'rgba(255,255,255,0.1)',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <motion.button onClick={prev} disabled={active === 0}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/4 flex items-center justify-center
                             text-white/40 hover:text-white hover:border-[#e8192c]/40 disabled:opacity-20 transition-colors">
                  <ChevronUp size={15} />
                </motion.button>
                <motion.button onClick={next} disabled={active === seasons.length - 1}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/4 flex items-center justify-center
                             text-white/40 hover:text-white hover:border-[#e8192c]/40 disabled:opacity-20 transition-colors">
                  <ChevronDown size={15} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
