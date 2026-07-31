"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Zap, Server, Shield, Wifi, Terminal } from "lucide-react";

const loadingTexts = [
  "INITIALIZING SYSTEM CORE...",
  "LOADING INTERFACE MODULES...",
  "OPTIMIZING GRAPHICS ENGINE...",
  "ESTABLISHING SECURE CONNECTION...",
  "ACCESSING PORTFOLIO DATA...",
  "SYSTEM READY..."
];

const icons = [
  { Icon: Code2, color: "text-indigo-500", delay: 0 },
  { Icon: Cpu, color: "text-purple-500", delay: 0.2 },
  { Icon: Globe, color: "text-pink-500", delay: 0.4 },
  { Icon: Server, color: "text-indigo-400", delay: 0.6 },
  { Icon: Shield, color: "text-purple-400", delay: 0.8 },
  { Icon: Wifi, color: "text-pink-400", delay: 1.0 },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Update text index based on progress chunks
        const newIndex = Math.min(
          Math.floor((prev / 100) * loadingTexts.length),
          loadingTexts.length - 1
        );
        setCurrentTextIndex(newIndex);
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden font-mono"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f12e_1px,transparent_1px),linear-gradient(to_bottom,#6366f12e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating Tech Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {icons.map(({ Icon, color, delay }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0.5, 1.2, 0.5],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
            className={`absolute ${color} opacity-20`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
          >
            <Icon size={24 + Math.random() * 24} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 p-4 text-center w-full max-w-sm md:max-w-md">
        
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Terminal size={16} className="text-indigo-500 animate-pulse md:w-5 md:h-5" />
            <span className="text-indigo-400 text-[10px] md:text-xs tracking-[0.3em] uppercase">System Boot Sequence</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            JP<span className="text-white/20">.SYS</span>
          </h1>
        </motion.div>

        {/* Central Tech Ring Animation */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 my-2">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-indigo-500/20 border-t-indigo-500 border-r-purple-500"
          />
          
          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-purple-500/20 border-b-purple-500 border-l-pink-500"
          />

          {/* Core Pulse */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-500/10 rounded-full backdrop-blur-md flex items-center justify-center border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                <Zap size={24} className="text-indigo-400 md:w-8 md:h-8" />
             </div>
          </motion.div>
        </div>

        {/* System Status Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 md:p-6 backdrop-blur-sm relative overflow-hidden group"
        >
          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"
          />

          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-indigo-300">
                {progress === 100 ? 'COMPLETE' : 'PROCESSING'}
              </span>
            </div>
            <span className="text-xl md:text-2xl font-bold font-mono text-white">{progress}%</span>
          </div>
          
          <div className="space-y-2 md:space-y-3">
            {/* Progress Bar */}
            <div className="h-1 md:h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between items-end">
              <div className="text-[10px] md:text-xs text-gray-400 font-mono h-4 truncate max-w-[150px] md:max-w-none">
                {">"} {loadingTexts[currentTextIndex]}
              </div>
              <div className="text-[8px] md:text-[10px] text-gray-600 font-mono uppercase whitespace-nowrap ml-2">
                Mem: {Math.floor(progress * 12.4)}MB
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer ID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 text-[10px] text-gray-600 tracking-[0.2em]"
        >
          ID: JAYODA-PORTFOLIO-V1.0 // SECURE
        </motion.div>

      </div>
    </motion.div>
  );
}
