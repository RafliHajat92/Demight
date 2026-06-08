import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Music2, Volume2, VolumeX } from 'lucide-react';
import { soundtracks } from '../data/memoriesData';

/* Fixed EQ bar heights — no Math.random() in render to avoid jitter */
const EQ_HEIGHTS = [0.4, 0.9, 0.6, 1.0, 0.5, 0.85, 0.45, 0.75, 0.35];
const EQ_PEAKS   = [0.85, 0.45, 0.95, 0.55, 0.80, 0.40, 0.70, 0.50, 0.65];

export default function AudioPlayer() {
  const [trackIdx,  setTrackIdx]  = useState(0);
  const [playing,   setPlaying]   = useState(false);
  const [muted,     setMuted]     = useState(false);
  const [volume,    setVolume]    = useState(0.4);
  const [expanded,  setExpanded]  = useState(false);
  const audioRef = useRef(null);
  const track = soundtracks[trackIdx];

  useEffect(() => {
    audioRef.current = new Audio(track.url);
    audioRef.current.volume = volume;
    audioRef.current.loop = true;
    return () => { audioRef.current?.pause(); };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = soundtracks[trackIdx].url;
    audioRef.current.volume = muted ? 0 : volume;
    if (playing) audioRef.current.play().catch(() => setPlaying(false));
  }, [trackIdx]);

  useEffect(() => {
    if (!audioRef.current) return;
    playing ? audioRef.current.play().catch(() => setPlaying(false)) : audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const skip = () => setTrackIdx(p => (p + 1) % soundtracks.length);

  return (
    <div className="fixed bottom-8 right-6 z-50">
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.93 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-64 glass rounded-lg p-4 shadow-[0_16px_48px_rgba(0,0,0,0.8)] text-left"
          >
            {/* Track info */}
            <motion.div
              className="flex items-start justify-between gap-3 mb-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 rounded bg-[#e8192c]/15 border border-[#e8192c]/25 flex items-center justify-center"
                  animate={playing ? { boxShadow: ['0 0 8px rgba(232,25,44,0.2)', '0 0 18px rgba(232,25,44,0.4)', '0 0 8px rgba(232,25,44,0.2)'] } : {}}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Music2 size={14} className="text-[#e8192c]" />
                </motion.div>
                <div>
                  <p className="text-[12px] font-semibold text-white leading-tight line-clamp-1">{track.title}</p>
                  <p className="text-[10px] text-[#5a6478]">{track.artist}</p>
                </div>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="text-[10px] font-mono text-[#5a6478] hover:text-white transition-colors cursor-pointer mt-0.5"
              >
                hide
              </button>
            </motion.div>

            {/* Equalizer */}
            <motion.div
              className="flex items-end justify-center gap-[3px] h-8 mb-4 bg-[#080810] rounded px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {EQ_HEIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  animate={playing
                    ? {
                        height: [
                          `${h * 100}%`,
                          `${EQ_PEAKS[i] * 100}%`,
                          `${h * 60}%`,
                          `${EQ_PEAKS[(i + 3) % 9] * 80}%`,
                          `${h * 100}%`,
                        ],
                      }
                    : { height: '15%' }
                  }
                  transition={playing
                    ? { duration: 0.8 + i * 0.12, repeat: Infinity, ease: 'easeInOut', delay: i * 0.06 }
                    : { duration: 0.4 }
                  }
                  className="eq-bar w-[3px]"
                />
              ))}
            </motion.div>

            {/* Controls */}
            <motion.div
              className="flex items-center justify-between gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setPlaying(p => !p)}
                  className="w-9 h-9 rounded bg-[#e8192c] hover:bg-[#ff2d42] flex items-center justify-center text-white transition-colors cursor-pointer shadow-[0_4px_16px_rgba(232,25,44,0.35)]"
                  whileHover={{ scale: 1.1, boxShadow: '0 4px 24px rgba(232,25,44,0.55)' }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <AnimatePresence mode="wait">
                    {playing
                      ? <motion.div key="pause" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
                          <Pause size={13} className="fill-white" />
                        </motion.div>
                      : <motion.div key="play" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
                          <Play size={13} className="fill-white translate-x-[1px]" />
                        </motion.div>
                    }
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  onClick={skip}
                  className="w-8 h-8 rounded border border-white/8 text-[#a8b3c8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  whileHover={{ scale: 1.08, x: 2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <SkipForward size={12} />
                </motion.button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 flex-1 max-w-[100px]">
                <motion.button
                  onClick={() => setMuted(m => !m)}
                  className="text-[#5a6478] hover:text-white transition-colors cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {muted
                      ? <motion.div key="muted" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
                          <VolumeX size={12} />
                        </motion.div>
                      : <motion.div key="vol" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
                          <Volume2 size={12} />
                        </motion.div>
                    }
                  </AnimatePresence>
                </motion.button>
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={muted ? 0 : volume}
                  onChange={e => { setVolume(+e.target.value); if (muted) setMuted(false); }}
                  className="flex-1 h-[3px] appearance-none rounded-full bg-[#1a1a2e] accent-[#e8192c] cursor-pointer"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.button
            key="orb"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 6 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => setExpanded(true)}
            whileHover={{ scale: 1.12, boxShadow: '0 0 40px rgba(232,25,44,0.65)' }}
            whileTap={{ scale: 0.94 }}
            className="relative w-12 h-12 rounded-full bg-[#e8192c] flex items-center justify-center text-white shadow-[0_0_24px_rgba(232,25,44,0.4)] transition-all duration-300 cursor-pointer"
          >
            <motion.div
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={playing ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}
            >
              <Music2 size={18} />
            </motion.div>
            {playing && (
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#080810]"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
