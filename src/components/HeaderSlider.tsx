import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeaderSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Check window size for mobile / pc response
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pcSlides = [
    {
      img: "https://img.jetron.com.br/img/jetorn-rebaling-pr.webp",
    },
    {
      img: "https://img.jetron.com.br/img/jetorn-rebaling.webp",
    }
  ];

  // Auto sliding for PC
  useEffect(() => {
    if (isHovered || isMobile) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % pcSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, isMobile]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % pcSlides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + pcSlides.length) % pcSlides.length);
  };

  const transitionVariants = {
    enter: (dir: number) => ({
      clipPath: dir > 0 
        ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" 
        : "polygon(0 0, 0 0, 0 100%, 0 100%)",
      transform: `perspective(1200px) rotateY(${dir > 0 ? 35 : -35}deg) scale(1.1)`,
      opacity: 0,
    }),
    center: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transform: "perspective(1200px) rotateY(0deg) scale(1)",
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      clipPath: dir > 0 
        ? "polygon(0 0, 0 0, 0 100%, 0 100%)" 
        : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      transform: `perspective(1200px) rotateY(${dir > 0 ? -35 : 35}deg) scale(0.95)`,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  if (isMobile) {
    // Render perfectly responsive mobile view without aspect constraints, using native w-full h-auto layout flow for the flyer
    return (
      <div 
        className="relative w-full overflow-hidden bg-slate-950 pt-0 border-b border-rose-500/10"
        id="aesthetic-header-mobile"
      >
        {/* Decorative top red line to lock into the header visual design */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-rose-500 to-blue-600 opacity-60 z-30" />

        {/* Mobile Flyer Image (100% full height auto-responsive layout with NO cuts/crops) */}
        <div className="relative w-full">
          <img 
            src="https://img.jetron.com.br/img/jetorn-rebaling-pr-cwb-puc.webp" 
            alt="Jetron Reballing - Curitiba PUCPR"
            className="w-full h-auto block select-none"
            referrerPolicy="no-referrer"
          />

          {/* Glowing laser Scan line overlay */}
          <div className="absolute inset-x-0 h-[2.5px] bg-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-[scan_4s_ease-in-out_infinite] top-0 pointer-events-none z-25" />

          {/* Tech Target Reticle Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none z-20">
            <div className="w-20 h-20 rounded-full border border-red-500/40 flex items-center justify-center animate-[spin_40s_linear_infinite]">
              <div className="w-16 h-16 rounded-full border border-dashed border-red-400/30" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-t border-l border-red-500/40" />
          </div>
          
          {/* Subtle depth gradient at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
        </div>

        <style>{`
          @keyframes scan {
            0% { top: 0%; opacity: 0.1; }
            45% { opacity: 0.5; }
            50% { opacity: 0.5; }
            95% { opacity: 0.1; }
            100% { top: 100%; opacity: 0.05; }
          }
        `}</style>
      </div>
    );
  }

  // Desktop Slide Screen Layout
  return (
    <div 
      className="relative w-full overflow-hidden bg-slate-950 pt-0 border-b border-rose-500/10 group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="aesthetic-header-slider"
    >
      {/* Decorative top red line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-rose-500 to-blue-600 opacity-60 z-30" />

      {/* PC Slide Display Window with responsive aspect ratio to match widescreen flyers perfectly without vertical or horizontal black gaps */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-950">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIdx + "-pc"}
            custom={direction}
            variants={transitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {/* Background blurred elements */}
            <img 
              src={pcSlides[currentIdx].img} 
              alt=""
              className="absolute inset-0 w-full h-full object-cover select-none filter blur-2xl opacity-40 scale-110 pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Main content image using full size with cover/contain auto-bounding */}
            <img 
              src={pcSlides[currentIdx].img} 
              alt="Estação Rework BGA Profissional"
              className="relative z-10 w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply z-15 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-15 pointer-events-none" />

            {/* HUD Graphics Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none">
                <div className="w-24 h-24 rounded-full border border-red-500/40 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                  <div className="w-20 h-20 rounded-full border border-dashed border-red-400/30" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-t border-l border-red-500/40" />
              </div>

              <div className="absolute inset-x-0 h-[2px] bg-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-[scan_3.5s_ease-in-out_infinite] top-0 pointer-events-none" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-[55%] -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-slate-950/80 border border-slate-800 text-white flex items-center justify-center hover:bg-slate-900 hover:border-red-500/40 opacity-0 group-hover/slider:opacity-100 focus:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-black/60"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={20} className="text-slate-300 hover:text-red-500 transition-colors" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-[55%] -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-slate-950/80 border border-slate-800 text-white flex items-center justify-center hover:bg-slate-900 hover:border-red-500/40 opacity-0 group-hover/slider:opacity-100 focus:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-black/60"
        aria-label="Próximo slide"
      >
        <ChevronRight size={20} className="text-slate-300 hover:text-red-500 transition-colors" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {pcSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIdx ? 1 : -1);
              setCurrentIdx(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIdx 
                ? "w-8 bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0.1; }
          45% { opacity: 0.45; }
          50% { opacity: 0.45; }
          95% { opacity: 0.1; }
          100% { top: 100%; opacity: 0.05; }
        }
      `}</style>
    </div>
  );
}
