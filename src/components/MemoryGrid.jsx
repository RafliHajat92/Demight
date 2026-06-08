import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Star, Calendar, MapPin, Filter } from 'lucide-react';
import { memories } from '../data/memoriesData';

const GENRES = ['All', 'Adventure', 'Comedy', 'Drama', 'Slice of Life'];

const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.055, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.3 } },
};

function MemoryCard({ memory, onClick, index }) {
  /* 3-D tilt on hover */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]),  { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]),  { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(memory.id)}
      whileHover={{ z: 20 }}
      className="group card-hover relative rounded-lg overflow-hidden cursor-pointer bg-[#12121e] border border-white/5"
    >
      {/* Poster */}
      <div className="aspect-[2/3] relative overflow-hidden">
        <motion.img
          src={memory.image}
          alt={memory.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.88)' }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Gradient overlay */}
        <div className="poster-overlay absolute inset-0" />

        {/* Hover reveal overlay */}
        <motion.div
          className="absolute inset-0 bg-black/0"
          whileHover={{ backgroundColor: 'rgba(0,0,0,0.28)' }}
          transition={{ duration: 0.4 }}
        />

        {/* Rating — top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.04 + 0.2 }}
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[11px] font-bold text-[#f5c518]"
        >
          <Star size={10} className="fill-[#f5c518]" />
          {memory.rating}
        </motion.div>

        {/* Year — top left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.04 + 0.25 }}
          className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-[#a8b3c8]"
        >
          {memory.year}
        </motion.div>

        {/* Genre tag — bottom left */}
        <div className="absolute bottom-16 left-0 right-0 px-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#e8192c]">
            {memory.genre.split(',')[0]}
          </span>
        </div>

        {/* Title + meta bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-[15px] font-bold text-white uppercase tracking-tight leading-tight font-display mb-2">
            {memory.title}
          </h3>

          {/* Hover-only meta */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-1.5"
            >
              <p className="text-[11px] text-[#a8b3c8] leading-relaxed line-clamp-2 font-light">
                {memory.synopsis}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#5a6478] pt-1 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Calendar size={9} className="text-[#e8192c]" /> {memory.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={9} className="text-[#e8192c]" /> {memory.location}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function MemoryGrid({ onOpenMemory }) {
  const [genre, setGenre] = useState('All');

  const filtered = genre === 'All'
    ? memories
    : memories.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase()));

  return (
    <section id="memories" className="relative py-20 bg-[#080810]">
      {/* Ambient glow */}
      <div className="glow-navy absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="space-y-2">
            <p className="section-label">Our Catalog</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase font-display">
              Memories Collection
            </h2>
            <p className="text-[14px] text-[#5a6478] font-light max-w-sm">
              Semua momen tersimpan dalam format sinema eksklusif.
            </p>
          </div>

          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="font-mono text-[11px] text-[#5a6478] bg-[#12121e] border border-white/5 px-4 py-2 rounded self-start md:self-end"
          >
            {memories.length} Episodes
          </motion.span>
        </motion.div>

        {/* Genre filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 mr-1 text-[#5a6478]"
          >
            <Filter size={12} />
          </motion.div>
          {GENRES.map((g, i) => (
            <motion.button
              key={g}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
              onClick={() => setGenre(g)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={`relative px-4 py-1.5 rounded-sm text-[12px] font-semibold tracking-wide transition-colors duration-250 cursor-pointer overflow-hidden ${
                genre === g
                  ? 'bg-[#e8192c] text-white'
                  : 'text-[#a8b3c8] border border-white/8 hover:border-white/15 hover:text-white bg-transparent'
              }`}
            >
              {genre === g && (
                <motion.span
                  layoutId="genre-pill"
                  className="absolute inset-0 bg-[#e8192c] rounded-sm -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {g}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((mem, i) => (
              <MemoryCard key={mem.id} memory={mem} onClick={onOpenMemory} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
