import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MemoryGrid from './components/MemoryGrid';
import Timeline from './components/Timeline';
import Cast from './components/Cast';
import ReviewWall from './components/ReviewWall';
import AudioPlayer from './components/AudioPlayer';
import Lightbox from './components/Lightbox';

/* ── Cinematic Loading Screen ─────────────────────────────────────────────── */
function Loader() {
  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 bg-[#080810] z-[9999] flex flex-col items-center justify-center"
    >
      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 2%)' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo only — no text */}
        <motion.img
          src="/images/logo.png"
          alt="Demight"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-56 h-56 object-contain"
          style={{ filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.4))' }}
        />

        {/* Progress line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-24 h-[1px] bg-[#1a1a2e] rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.6 }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#ffffff] to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Main App ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [memoryId, setMemoryId] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-[#080810] flex flex-col overflow-x-hidden"
        >
          <Navbar />

          <main className="flex-1">
            <Hero onOpenMemory={setMemoryId} />
            <MemoryGrid onOpenMemory={setMemoryId} />
            <Timeline />
            <Cast />
            <ReviewWall />
          </main>

          <AudioPlayer />

          <AnimatePresence>
            {memoryId && (
              <Lightbox memoryId={memoryId} onClose={() => setMemoryId(null)} />
            )}
          </AnimatePresence>

          {/* ── Footer ──────────────────────────────────────────── */}
          <footer className="border-t border-white/5 bg-[#0a0a12] py-10">
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-5">

              <div className="flex items-center">
                <img
                  src="/images/logo.png"
                  alt="Demight"
                  className="w-24 h-24 md:w-28 md:h-28 object-contain"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.4))' }}
                />
              </div>

              <p className="text-[12px] text-[#5a6478] flex items-center gap-1.5 font-light">
                Since 23 <Heart size={10} className="text-[#e8192c] fill-[#e8192c]" /> Sistem Informasi UAD
              </p>

              <p className="font-mono text-[10px] text-[#2a2a3e] tracking-widest uppercase">
                © {new Date().getFullYear()} Demight · All Recall Rights Reserved
              </p>
            </div>
          </footer>
        </motion.div>
      )}
    </>
  );
}
