import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Heart } from 'lucide-react';

import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import MemoryGrid from './components/MemoryGrid';
import Timeline   from './components/Timeline';
import Cast       from './components/Cast';
import ReviewWall from './components/ReviewWall';
import AudioPlayer from './components/AudioPlayer';
import Lightbox   from './components/Lightbox';

/* ── Cinematic Loading Screen ─────────────────────────────────────────────── */
function Loader() {
  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 bg-[#080810] z-[9999] flex flex-col items-center justify-center gap-8"
    >
      {/* Ambient red glow */}
      <div className="absolute w-[280px] h-[280px] rounded-full bg-[#e8192c]/12 blur-[80px]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-14 h-14 rounded-lg bg-[#e8192c] flex items-center justify-center shadow-[0_0_40px_rgba(232,25,44,0.5)]"
        >
          <Film size={26} className="text-white" />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="font-display font-extrabold text-2xl tracking-[0.25em] text-white uppercase">
            DEMIGHT
          </h1>
          <p className="text-[11px] font-mono text-[#5a6478] tracking-widest mt-1 uppercase">
            Cinematic Memories Portal
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-40 h-[2px] bg-[#1a1a2e] rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, ease: [0.4, 0, 0.6, 1], repeat: 0, delay: 0.4 }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#e8192c] to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main App ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [loading,  setLoading]  = useState(true);
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
            <Hero       onOpenMemory={setMemoryId} />
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

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#e8192c] flex items-center justify-center shadow-[0_0_12px_rgba(232,25,44,0.35)]">
                  <Film size={13} className="text-white" />
                </div>
                <span className="font-display font-extrabold text-[14px] tracking-[0.12em] text-white uppercase">Demight</span>
              </div>

              <p className="text-[12px] text-[#5a6478] flex items-center gap-1.5 font-light">
                Made with <Heart size={10} className="text-[#e8192c] fill-[#e8192c]" /> for a lifelong friendship
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
