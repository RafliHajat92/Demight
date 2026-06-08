import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Star, User, Clock } from 'lucide-react';
import { memories } from '../data/memoriesData';

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.35 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const contentStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const contentItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const castBadgeVariants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.35, delay: i * 0.06, type: 'spring', stiffness: 320, damping: 22 },
  }),
};

export default function Lightbox({ memoryId, onClose }) {
  const memory = memories.find(m => m.id === memoryId);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  if (!memory) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">

      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="absolute inset-0 bg-black/88 backdrop-blur-[10px] cursor-pointer"
      />

      {/* Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-4xl rounded-lg bg-[#0f0f1a] border border-white/8 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-10 max-h-[88vh] flex flex-col md:flex-row"
      >
        {/* Left — Image */}
        <motion.div
          className="relative w-full md:w-[40%] shrink-0 aspect-[16/10] md:aspect-auto min-h-[200px] overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.75) saturate(0.9)' }}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f0f1a]/80" />

          {/* Rating badge on image */}
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-black/75 backdrop-blur-sm text-[12px] font-bold text-[#f5c518]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Star size={11} className="fill-[#f5c518]" />
            {memory.rating}
          </motion.div>
        </motion.div>

        {/* Right — Details */}
        <motion.div
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 text-left"
          variants={contentStagger}
          initial="hidden"
          animate="visible"
        >

          {/* Close + title row */}
          <motion.div variants={contentItem} className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <motion.span
                className="text-[10px] font-mono tracking-widest text-[#e8192c] uppercase font-bold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                {memory.genre.split(',')[0]}
              </motion.span>
              <h3 className="text-[22px] md:text-[28px] font-extrabold text-white tracking-tight uppercase leading-tight font-display">
                {memory.title}
              </h3>
            </div>
            <motion.button
              onClick={onClose}
              className="shrink-0 p-2 rounded border border-white/8 text-[#5a6478] hover:text-white hover:border-white/15 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <X size={15} />
            </motion.button>
          </motion.div>

          {/* Meta tags */}
          <motion.div variants={contentItem} className="flex flex-wrap gap-3 text-[12px] text-[#a8b3c8]">
            {[
              { icon: <Calendar size={11} className="text-[#e8192c]" />, text: memory.date },
              { icon: <MapPin   size={11} className="text-[#e8192c]" />, text: memory.location },
              { icon: <Clock    size={11} className="text-[#e8192c]" />, text: memory.duration },
            ].map((item, i) => (
              <motion.span
                key={i}
                className="flex items-center gap-1.5 bg-[#080810] border border-white/5 px-3 py-1.5 rounded"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
              >
                {item.icon} {item.text}
              </motion.span>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={contentItem}
            className="h-px bg-white/5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ originX: 0 }}
          />

          {/* Story */}
          <motion.div variants={contentItem}>
            <p className="text-[10px] font-mono tracking-widest text-[#5a6478] uppercase mb-3">Full Story</p>
            <p className="text-[14px] text-[#a8b3c8] leading-loose font-light">{memory.story}</p>
          </motion.div>

          {/* Cast */}
          <motion.div variants={contentItem}>
            <p className="text-[10px] font-mono tracking-widest text-[#5a6478] uppercase mb-3">Cast Involved</p>
            <div className="flex flex-wrap gap-2">
              {memory.cast.map((name, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={castBadgeVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.06, borderColor: 'rgba(232,25,44,0.35)' }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#080810] border border-white/5 text-[12px] text-[#a8b3c8] font-medium transition-colors"
                >
                  <User size={10} className="text-[#e8192c]" />
                  {name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
