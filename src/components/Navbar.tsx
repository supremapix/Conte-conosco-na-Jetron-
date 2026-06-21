/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  Cpu, 
  Laptop, 
  Layers, 
  Tablet, 
  Gamepad2, 
  MessageSquare, 
  MapPin, 
  HelpCircle,
  Accessibility,
  ArrowRight,
  Home
} from "lucide-react";
import { SERVICES } from "../data";

interface NavbarProps {
  onNavigate: (route: string) => void;
  currentRoute: string;
  onOpenElderlyMenu?: () => void;
}

export default function Navbar({ onNavigate, currentRoute, onOpenElderlyMenu }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Compact, high-intent navigation items for desktop to avoid clutter
  const navigationItems = [
    { name: "Quem Somos", route: "/quem-somos", icon: HelpCircle },
    { name: "Laboratório", route: "/laboratorio", icon: Layers },
    { name: "Diagnóstico IA", route: "/diagnostico-ia", icon: Cpu },
    { name: "Blog Técnico", route: "/blog", icon: Laptop },
    { name: "Contato", route: "/contato", icon: Phone }
  ];

  const handleLinkClick = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    onNavigate(route);
    setIsOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const serviceIcons: Record<string, any> = {
    "placa-video": Cpu,
    "reballing": Layers,
    "macbook": Laptop,
    "notebook": Laptop,
    "apple": Tablet,
    "pc-gamer": Gamepad2
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-transparent font-sans pointer-events-none">
      {/* Floating Easy-Access Menu Toggle-Button on Top-Right Corner for all screens */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-8 z-[101] pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 rounded-full bg-slate-950/95 border-2 border-red-500 text-white flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 animate-[button-pulse_1.5s_infinite] cursor-pointer"
          aria-label={isOpen ? "Fechar Menu" : "Abrir Menu fácil de Ajuda"}
        >
          {isOpen ? (
            <>
              <X size={16} className="stroke-[3] text-red-400" />
              <span className="font-display font-black text-[10px] sm:text-xs uppercase tracking-wider text-red-400">FECHAR</span>
            </>
          ) : (
            <>
              <Menu size={16} className="stroke-[3] text-red-500" />
              <span className="font-display font-black text-[10px] sm:text-xs uppercase tracking-wider text-white">MENU INTERATIVO</span>
            </>
          )}
        </button>
      </div>

      {/* Fullscreen Elder-Friendly Interactive Menu Modal with Right-to-Left Slide Animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Dimmer overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[105] bg-black/75 backdrop-blur-sm pointer-events-auto"
            />

            {/* Slide-over Right-to-Left Drawer Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-[110] w-[85%] sm:w-[75%] max-w-[390px] h-screen bg-slate-950/98 border-l border-slate-900/80 p-5 overflow-y-auto flex flex-col justify-between pointer-events-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div>
                <div className="flex items-start justify-between pb-4 border-b border-slate-900/80">
                  <div>
                    <div className="flex items-center gap-1.5 text-red-500 font-bold text-[10px] sm:text-xs tracking-wider uppercase font-mono">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                      Central de Atendimento
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-white mt-1">Como podemos te ajudar?</h2>
                  </div>
                  
                  {/* Large High-Contrast Exit Button */}
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border-2 border-red-500/30 rounded-xl text-red-500 hover:text-red-400 flex items-center justify-center shadow-lg active:scale-90 transition-all"
                    aria-label="Fechar Menu"
                  >
                    <X size={20} className="stroke-[3]" />
                  </button>
                </div>

                {/* Elder-Friendly Big Action Buttons Stack */}
                <div className="mt-5 space-y-3.5">
                  
                  {/* 0. HOME / PÁGINA INICIAL */}
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    onClick={(e) => handleLinkClick(e, "/")}
                    className="w-full bg-slate-900 hover:bg-slate-800 border-2 border-red-500 p-3.5 rounded-xl flex items-center justify-between text-white shadow-[0_4px_25px_rgba(239,68,68,0.15)] active:scale-98 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2 rounded-lg bg-red-650/20 text-red-500">
                        <Home size={22} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold tracking-tight">PÁGINA INICIAL / HOME</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-semibold">Ir para o Início do Site</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="stroke-[3] text-red-500 mr-0.5" />
                  </motion.button>
                  
                  {/* 1. WHATSAPP (GIANT GREEN DIRECT CTA) */}
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    href="https://wa.me/5541999383882"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 border-2 border-emerald-400/30 p-3.5 rounded-xl flex items-center justify-between text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)] active:scale-98 transition-all"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2 rounded-lg bg-slate-950/20 text-white">
                        <MessageSquare size={22} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold tracking-tight">FALAR NO WHATSAPP</div>
                        <div className="text-[10px] text-emerald-100 mt-0.5 font-semibold">Técnico de Plantão</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="stroke-[3] text-emerald-100 mr-0.5" />
                  </motion.a>

                  {/* 2. PHONE CALL (GIANT PHONE CALL COMFY CTA) */}
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    href="tel:4130180964"
                    className="w-full bg-gradient-to-r from-red-650 to-rose-650 border-2 border-red-500/35 p-3.5 rounded-xl flex items-center justify-between text-white shadow-[0_4px_20px_rgba(239,68,68,0.25)] active:scale-98 transition-all"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2 rounded-lg bg-slate-950/20 text-white">
                        <Phone size={22} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold tracking-tight">LIGAR POR TELEFONE</div>
                        <div className="text-[10px] text-red-100 mt-0.5 font-semibold">Fixo: (41) 3018-0964</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="stroke-[3] text-red-100 mr-0.5" />
                  </motion.a>

                  {/* 3. SIMPLIFIED ELDER MODE (GOLDEN SPECIAL) */}
                  {onOpenElderlyMenu && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => {
                        setIsOpen(false);
                        onOpenElderlyMenu();
                      }}
                      className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 border-2 border-yellow-300 p-3.5 rounded-xl flex items-center justify-between text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.25)] active:scale-98 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 rounded-lg bg-slate-950/10 text-slate-950">
                          <Accessibility size={22} className="stroke-[2.5]" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold tracking-tight">ATIVAR MODO DE AJUDA</div>
                          <div className="text-[10px] text-amber-950 mt-0.5 font-semibold">Letras Maiores & Narração</div>
                        </div>
                      </div>
                      <ArrowRight size={16} className="stroke-[3] text-amber-950 mr-0.5" />
                    </motion.button>
                  )}

                </div>

                {/* SERVICES MINI SECTION */}
                <div className="mt-6">
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-slate-400" />
                    Principais Consertos
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1.5">
                    {SERVICES.map((service, index) => {
                      const IconComp = serviceIcons[service.id] || Cpu;
                      return (
                        <motion.a
                          key={service.slug}
                          href={`/${service.slug}`}
                          onClick={(e) => handleLinkClick(e, `/${service.slug}`)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + index * 0.05 }}
                          className={`flex items-center gap-3 p-2.5 rounded-lg border ${currentRoute === `/${service.slug}` ? 'bg-red-600/10 border-red-500/45 text-red-400' : 'bg-slate-900/60 border-slate-800 text-slate-300'} active:scale-98 transition-all`}
                        >
                          <div className="p-1 rounded bg-slate-950 text-red-500">
                            <IconComp size={16} className="stroke-[2]" />
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-bold text-xs text-slate-100">{service.title}</div>
                            <p className="text-slate-500 text-[9px] font-medium line-clamp-1">{service.shortDescription}</p>
                          </div>
                          <ArrowRight size={12} className="text-slate-500" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* AUXILIARY LINKS MENU */}
                <div className="mt-5 pt-4 border-t border-slate-900 grid grid-cols-2 gap-1.5">
                  {navigationItems.map((item, index) => {
                    const ItemIcon = item.icon || HelpCircle;
                    return (
                      <a
                        key={item.route}
                        href={item.route}
                        onClick={(e) => handleLinkClick(e, item.route)}
                        className={`flex items-center gap-1.5 p-2 rounded-lg text-[10px] font-bold ${currentRoute === item.route ? 'bg-red-600/10 text-red-500' : 'bg-slate-900/30 border border-slate-800/40 text-slate-400'}`}
                      >
                        <ItemIcon size={12} className="opacity-70" />
                        {item.name}
                      </a>
                    );
                  })}
                </div>

              </div>

              {/* Address & Trust Badge at the very bottom */}
              <div className="mt-6 pt-4 border-t border-slate-900/80 text-center space-y-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  <MapPin size={10} className="text-red-500" />
                  PUCPR — PORTÃO 2
                </p>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  Rua Imaculada Conceição, 1155 - Curitiba<br />
                  Estacionamento amplo de fácil acesso
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Styled Animations */}
      <style>{`
        @keyframes button-pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(239,68,68,0.45); border-color: rgba(239,68,68,0.8); }
          50% { box-shadow: 0 0 25px rgba(239,68,68,0.75); border-color: rgba(239,68,68,1); transform: scale(1.03); }
        }
      `}</style>
    </nav>
  );
}
