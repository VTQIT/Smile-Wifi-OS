/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Search, Menu, GraduationCap, PlayCircle, FileText, Headphones, Mic2, Music, Globe, Target, Circle, Settings, Image, Map, Cloud, Calculator, Notebook } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';

interface AppIcon {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

const apps: AppIcon[] = [
  { id: 'campus', name: 'CampusDC', icon: <GraduationCap className="w-8 h-8 text-white" />, color: 'bg-sky-400', bg: 'bg-sky-500/20' },
  { id: 'smileflix', name: 'SmileFlix', icon: <PlayCircle className="w-8 h-8 text-white" />, color: 'bg-red-500', bg: 'bg-red-500/20' },
  { id: 'publicdoc', name: 'PublicDoc', icon: <FileText className="w-8 h-8 text-white" />, color: 'bg-blue-600', bg: 'bg-blue-600/20' },
  { id: 'bandits', name: 'Blayne&Bandits', icon: <Headphones className="w-8 h-8 text-white" />, color: 'bg-indigo-600', bg: 'bg-indigo-600/20' },
  { id: 'karaoke', name: 'Karaoke', icon: <Mic2 className="w-8 h-8 text-white" />, color: 'bg-emerald-500', bg: 'bg-emerald-500/20' },
  { id: 'musify', name: 'Musify', icon: <Music className="w-8 h-8 text-white" />, color: 'bg-pink-500', bg: 'bg-pink-500/20' },
  { id: 'settings', name: 'Settings', icon: <Settings className="w-8 h-8 text-white" />, color: 'bg-gray-500', bg: 'bg-gray-500/20' },
  { id: 'gallery', name: 'Gallery', icon: <Image className="w-8 h-8 text-white" />, color: 'bg-amber-500', bg: 'bg-amber-500/20' },
  { id: 'maps', name: 'Maps', icon: <Map className="w-8 h-8 text-white" />, color: 'bg-green-600', bg: 'bg-green-600/20' },
  { id: 'weather', name: 'Weather', icon: <Cloud className="w-8 h-8 text-white" />, color: 'bg-cyan-500', bg: 'bg-cyan-500/20' },
  { id: 'calc', name: 'Calculator', icon: <Calculator className="w-8 h-8 text-white" />, color: 'bg-orange-500', bg: 'bg-orange-500/20' },
  { id: 'notes', name: 'Notes', icon: <Notebook className="w-8 h-8 text-white" />, color: 'bg-purple-500', bg: 'bg-purple-500/20' },
];

const APPS_PER_PAGE = 6;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApps.length / APPS_PER_PAGE);
  const x = useMotionValue(0);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (info.offset.x > swipeThreshold && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-white/20 overflow-hidden relative">
      {/* Starry Background Overlay */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-md mx-auto h-screen flex flex-col p-6">
        {/* Header */}
        <header className="flex justify-start mb-4">
          <button className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-black/60 transition-colors">
            Menu
          </button>
        </header>

        {/* Banner / Video Ads */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-black/50 border border-white/5 bg-black shrink-0"
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-at-the-seaside-4032-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-3 mb-2">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                <Globe className="text-white w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter italic text-pink-400 drop-shadow-lg">Smile</h2>
          </div>
          {/* Ad Label */}
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/10">
            Sponsored
          </div>
        </motion.div>

        {/* Title & Description */}
        <div className="text-center mb-6 shrink-0">
          <h1 className="text-4xl font-bold tracking-tight text-white/90 mb-2 font-serif italic opacity-80">Cribble</h1>
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
            Cached response on Intranet based bandwidth linked ecosystem
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 shrink-0">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-full py-3 px-6 text-black placeholder:text-gray-400 focus:outline-none shadow-lg"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* App Grid with Swipe */}
        <div className="relative overflow-hidden flex-1 mb-4">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${currentPage * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex h-full"
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="min-w-full grid grid-cols-3 grid-rows-2 gap-y-8 gap-x-4">
                {filteredApps
                  .slice(pageIndex * APPS_PER_PAGE, (pageIndex + 1) * APPS_PER_PAGE)
                  .map((app) => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveApp(app.name)}
                      className="flex flex-col items-center group h-fit"
                    >
                      <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-white/10 transition-shadow duration-300 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {app.icon}
                      </div>
                      <span className="mt-2 text-[11px] font-semibold text-white/80 tracking-tight">{app.name}</span>
                    </motion.button>
                  ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-8 shrink-0">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'bg-sky-400 w-4' : 'bg-white/20'}`} 
            />
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="flex justify-between items-center px-8 pb-4 shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 opacity-60">
            <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=100" alt="Earth" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full border-2 border-orange-500 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
              </div>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 opacity-60">
            <img src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=100" alt="Mars" className="w-full h-full object-cover" />
          </div>
        </footer>
      </div>

      {/* App Launch Overlay */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
              <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Launching {activeApp}</h3>
            <p className="text-white/40 mb-8">Connecting to local intranet node...</p>
            <button 
              onClick={() => setActiveApp(null)}
              className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
