import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'memories', label: 'Memories' },
  { id: 'seasons', label: 'Seasons' },
  { id: 'cast', label: 'Cast' },
  { id: 'reviews', label: 'Reviews' },
];

const navContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          for (const item of [...NAV_ITEMS].reverse()) {
            const el = document.getElementById(item.id);
            if (el && el.getBoundingClientRect().top <= 140) {
              setActiveSection(item.id);
              break;
            }
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? 'glass border-b border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
            : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-none border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('home')}
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <motion.img
              src="/images/logo.png"
              alt="Demight"
              className="w-12 h-12 object-contain"
              whileHover={{ rotate: 10 }}
              style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.5))' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Desktop nav */}
          <motion.nav
            className="hidden md:flex items-center gap-8"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  variants={navItemVariants}
                  onClick={() => scrollTo(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className={`nav-link text-[13px] font-semibold tracking-wide py-1 cursor-pointer transition-colors duration-300 ${isActive ? 'text-white active' : 'text-[#a8b3c8] hover:text-white'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#e8192c] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.nav>

          {/* Live badge + Hamburger */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/6 text-[10px] text-[#a8b3c8] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span>Season 3</span>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[#a8b3c8] hover:text-white transition-colors cursor-pointer"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-5 space-y-1.5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-[1.5px] bg-current"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="block h-[1.5px] bg-current"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-[1.5px] bg-current"
                />
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden glass border-t border-white/5"
            >
              <div className="flex flex-col py-4 px-6 gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    custom={i}
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => scrollTo(item.id)}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`text-left py-3 text-sm font-semibold border-b border-white/4 cursor-pointer transition-colors duration-200 ${activeSection === item.id ? 'text-[#e8192c]' : 'text-[#a8b3c8] hover:text-white'
                      }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
