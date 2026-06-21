/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { SERVICES, ALL_NEIGHBORHOODS, SURROUNDING_CITIES } from "./data";
import { Phone, MessageCircle, X, MapPin, Accessibility, ArrowRight, BookOpen, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EnhancedSEO from "./components/EnhancedSEO";
import HeaderSlider from "./components/HeaderSlider";

// Page Imports
import HomePage from "./components/HomePage";
import LaboratorioPage from "./components/LaboratorioPage";
import DiagnosticoIAPage from "./components/DiagnosticoIAPage";
import BlogPage from "./components/BlogPage";
import ContatoPage from "./components/ContatoPage";
import ServicePage from "./components/ServicePage";
import LocationPage from "./components/LocationPage";
import QuemSomosPage from "./components/QuemSomosPage";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [isElderlyMenuOpen, setIsElderlyMenuOpen] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (route: string) => {
    window.history.pushState(null, "", route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Matched Route Render Engine
  const renderContent = () => {
    const normRoute = currentRoute.replace(/\/$/, "");

    // Static Routes
    if (normRoute === "" || normRoute === "/") {
      return (
        <>
          <EnhancedSEO
            title="Jetron Curitiba | Conserto de Placa de Vídeo, MacBook e Reballing"
            description="Assistência técnica especializada em eletrônica de alta precisão em Curitiba: Reballing profissional BGA, Macs, placas de vídeo Nvidia/AMD, notebooks e consoles."
          />
          <HomePage onNavigate={navigate} />
        </>
      );
    }
    
    if (normRoute === "/laboratorio") {
      return (
        <>
          <EnhancedSEO
            title="Laboratório Avançado Jetron | Estações de Reballing e Soldagem Microscópica"
            description="Conheça nossa infraestrutura profissional de microeletrônica com estações infravermelhas Jet Common, osciloscópios e microscópios de alta definição."
          />
          <LaboratorioPage onNavigate={navigate} />
        </>
      );
    }

    if (normRoute === "/diagnostico-ia") {
      return (
        <>
          <EnhancedSEO
            title="Diagnóstico IA Jetron | Análise Lógica Inteligente de Hardware"
            description="Use nosso copiloto de inteligência artificial de bancada para identificar furos elétricos, panes de RAM ou VRM em placas de vídeo e computadores."
          />
          <DiagnosticoIAPage />
        </>
      );
    }

    if (normRoute === "/blog") {
      return (
        <>
          <EnhancedSEO
            title="Blog de Microeletrônica Industrial | Jetron Curitiba"
            description="Leia guias técnicos explicativos escritos por engenheiros sobre reballing BGA, perigos do reflow e cuidados com alimentação de placas lógicas."
          />
          <BlogPage />
        </>
      );
    }

    if (normRoute === "/quem-somos") {
      return (
        <>
          <EnhancedSEO
            title="Quem Somos - Conheça a Jetron | Engenharia de Hardware"
            description="Liderados por técnicos apaixonados, recuperamos hardware com micro-soldagem em Curitiba, anexo ao DCE da PUCPR."
          />
          <QuemSomosPage onNavigate={navigate} />
        </>
      );
    }

    if (normRoute === "/contato") {
      return (
        <>
          <EnhancedSEO
            title="Contato Jetron Curitiba | Venha ao Nosso Laboratório"
            description="Visite-nos em Curitiba no Prado Velho, Rua Imaculada Conceição, 1155 (anexo ao DCE da PUCPR). Fone fixo (41) 3018-0964, fone WhatsApp (41) 99938-3882."
          />
          <ContatoPage />
        </>
      );
    }

    // Dynamic Services matching
    const serviceMatch = SERVICES.find(s => normRoute.endsWith(s.slug));
    if (serviceMatch) {
      return (
        <>
          <EnhancedSEO
            title={serviceMatch.seoTitle}
            description={serviceMatch.seoDescription}
          />
          <ServicePage service={serviceMatch} />
        </>
      );
    }

    // Dynamic Neighborhood pages matching (/bairro/:slug)
    if (normRoute.includes("/bairro/")) {
      const bSlug = normRoute.split("/bairro/")[1];
      const matchedB = ALL_NEIGHBORHOODS.find(n => n.slug === bSlug);
      if (matchedB) {
        const bTitle = `Conserto de Placa de Vídeo e Notebook no ${matchedB.name}, Curitiba | Jetron`;
        const bDesc = `Assistência técnica avançada próxima ao bairro ${matchedB.name} em Curitiba. Executamos reballing de chips BGA, reparos pós-líquido em MacBooks e placas de vídeo.`;
        return (
          <>
            <EnhancedSEO title={bTitle} description={bDesc} />
            <LocationPage locationType="bairro" locationName={matchedB.name} isOfficial={matchedB.isOfficial} />
          </>
        );
      }
    }

    // Dynamic surrounding cities pages matching (/cidade/:slug)
    if (normRoute.includes("/cidade/")) {
      const cSlug = normRoute.split("/cidade/")[1];
      const matchedC = SURROUNDING_CITIES.find(c => c.slug === cSlug);
      if (matchedC) {
        const cTitle = `Conserto de Placa de Vídeo e MacBook em ${matchedC.name} - PR | Jetron`;
        const cDesc = `Oferecemos retirada e entrega rápidas em ${matchedC.name} para todos os serviços avançados de microsoldagem de placas de vídeo e computadores.`;
        return (
          <>
            <EnhancedSEO title={cTitle} description={cDesc} />
            <LocationPage locationType="cidade" locationName={matchedC.name} />
          </>
        );
      }
    }

    // Dynamic Blog posts matching (/blog/:slug)
    if (normRoute.includes("/blog/")) {
      return (
        <>
          <EnhancedSEO
            title="Blog Técnico de Hardware e Eletrônica | Jetron Curitiba"
            description="Leia guias técnicos detalhados explicativos de como placas estragam e como realizar manutenção preventiva premium."
          />
          <BlogPage />
        </>
      );
    }

    // Default Fallback
    return (
      <>
        <EnhancedSEO
          title="Jetron Curitiba | Assistência Técnica Avançada"
          description="Especialistas em reparos de microscópio, reballing e microeletrônica em Curitiba."
        />
        <HomePage onNavigate={navigate} />
      </>
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 flex flex-col justify-between selection:bg-red-500 selection:text-white relative">
      {/* 1. TOP HEADER NAVIGATION */}
      <Navbar onNavigate={navigate} currentRoute={currentRoute} onOpenElderlyMenu={() => setIsElderlyMenuOpen(true)} />

      {/* NEW SLIDER RIGHT AFTER HEADER (ONLY ON THE HOME PAGE) */}
      {(currentRoute === "/" || currentRoute === "" || currentRoute === "/index.html") && <HeaderSlider />}

      {/* 2. DYNAMICALLY ROUTED MAIN VIEW FRAME */}
      <main className="flex-grow pb-24 md:pb-0">
        {renderContent()}
      </main>

      {/* 3. CORE SUB-FOOTER REPERTOIRE */}
      <Footer onNavigate={navigate} currentRoute={currentRoute} onOpenElderlyMenu={() => setIsElderlyMenuOpen(true)} />

      {/* SENIORS / ELDERLY ACCESSIBILITY MODAL OVERLAY */}
      {isElderlyMenuOpen && (
        <div className="fixed inset-0 z-55 bg-slate-950/95 flex items-center justify-center p-4 overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-slate-900 border-4 border-yellow-400 w-full max-w-2xl rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto relative text-left">
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="p-4 bg-slate-950 rounded-full border-2 border-yellow-400 text-yellow-400">
                  <Accessibility size={48} className="stroke-[2.5]" />
                </div>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-yellow-400 tracking-tight text-center leading-tight">
                Menu de Ajuda Fácil - Jetron
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto text-center leading-relaxed">
                Preparamos esta tela com letras grandes e botões fáceis para ajudar você a falar conosco e encontrar o nosso laboratório sem complicação!
              </p>
            </div>

            {/* Large Buttons Block */}
            <div className="space-y-4">
              
              {/* Option 1: Call Phone */}
              <a 
                href="tel:4130180964"
                className="w-full bg-slate-100 hover:bg-white text-slate-950 hover:scale-[1.01] active:scale-95 transition-all p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-b-4 border-slate-300 group cursor-pointer"
              >
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1 justify-center sm:justify-start">
                    <Phone size={12} className="text-slate-450" />
                    CLIQUE AQUI PARA LIGAR PELO TELEFONE FIXO:
                  </span>
                  <span className="text-xl sm:text-3xl font-black font-mono tracking-tight block">
                    (41) 3018-0964
                  </span>
                </div>
                <div className="text-slate-950 bg-slate-200 p-3 rounded-full group-hover:scale-110 transition-transform flex items-center justify-center">
                  <Phone size={24} className="stroke-[2.5]" />
                </div>
              </a>

              {/* Option 2: WhatsApp */}
              <a 
                href="https://wa.me/5541999383882"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-400 text-slate-950 hover:scale-[1.01] active:scale-95 transition-all p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-b-4 border-green-700 group cursor-pointer"
              >
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1 justify-center sm:justify-start">
                    <MessageCircle size={12} className="text-slate-800" />
                    CLIQUE PARA MANDAR MENSAGEM NO WHATSAPP:
                  </span>
                  <span className="text-xl sm:text-3xl font-black font-mono tracking-tight block">
                    (41) 99938-3882
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-full group-hover:scale-110 transition-transform text-green-400 flex items-center justify-center animate-pulse">
                  <MessageCircle size={24} className="stroke-[2.5]" />
                </div>
              </a>

              {/* Option 3: Physical Address */}
              <div className="bg-slate-950 p-5 rounded-2xl border-2 border-slate-800 space-y-4 text-left">
                <div>
                  <span className="block text-[11px] font-bold text-yellow-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <MapPin size={12} className="text-yellow-400" />
                    NOSSO ENDEREÇO EM CURITIBA:
                  </span>
                  <p className="text-base sm:text-lg font-black text-white mt-1 leading-snug">
                    Rua Imaculada Conceição, 1155
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 leading-normal">
                    Bairro Prado Velho — CEP 80.215-901<br />
                    <strong className="text-yellow-400 text-sm">Fica dentro/anexo ao DCE da PUCPR!</strong>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 italic leading-relaxed">
                    Aviso prático: Fica próximo à entrada da PUC Paraná, com estacionamento rápido em frente e fácil acessibilidade para entrega do aparelho.
                  </p>
                </div>
                
                {/* Clear Map Directions */}
                <a
                  href="https://maps.google.com/?q=Rua%20Imaculada%20Concei%C3%A7%C3%A3o%2C%201155%20-%20Prado%20Velho%2C%20Curitiba%20-%20PR%2C%2080215-901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-yellow-400 border border-yellow-400/50 hover:border-yellow-400 text-xs py-3 rounded-xl text-center block transition-all uppercase tracking-wide font-black flex items-center justify-center gap-1.5"
                >
                  <MapPin size={14} className="text-yellow-400" />
                  ABRIR MAPA NO MEU GPS
                </a>
              </div>

              {/* Option 4: Quem somos */}
              <button
                id="elderly-about-trigger"
                onClick={() => {
                  setIsElderlyMenuOpen(false);
                  navigate("/quem-somos");
                }}
                className="w-full bg-slate-950 hover:bg-slate-900 text-slate-200 border-2 border-slate-800 hover:border-yellow-400/40 text-xs sm:text-sm p-4 rounded-xl flex items-center justify-between transition-all font-black text-left cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={16} className="text-slate-400" />
                  CONHECER A HISTÓRIA DA JETRON (QUEM SOMOS)
                </span>
                <ArrowRight size={16} className="text-yellow-400" />
              </button>

            </div>

            {/* Option 5: Close modal button */}
            <div className="pt-2 text-center">
              <button
                id="close-elderly-trigger"
                onClick={() => setIsElderlyMenuOpen(false)}
                className="w-full sm:w-auto bg-red-650 hover:bg-red-600 text-white font-black text-sm uppercase px-8 py-4 rounded-2xl shadow-lg cursor-pointer flex items-center justify-center gap-2 mx-auto"
              >
                <X size={16} className="stroke-[3]" />
                FECHAR AJUDA E VOLTAR AO SITE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE ONLY EYE-CATCHING ACTION FOOTER BAR */}
      {showMobileActions && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-slate-950/95 backdrop-blur-md border-t border-slate-900 p-3 pb-[calc(14px+env(safe-area-inset-bottom))] flex items-center gap-3 animate-[slideUp_0.4s_ease-out]">
          
          {/* Circular close button for mobile floating action footer bar */}
          <button
            onClick={() => setShowMobileActions(false)}
            className="absolute -top-3.5 right-4 w-7 h-7 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer z-10"
            aria-label="Ocultar botões de contato"
          >
            <X size={14} className="stroke-[3]" />
          </button>

          <a
            href="tel:4130180964"
            className="flex-1 h-12 bg-red-650 hover:bg-red-700 text-white font-display font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-[breath-red_2s_infinite]"
          >
            <Phone size={14} className="animate-bounce" />
            Ligar
          </a>
          <a
            href="https://wa.me/5541999383882"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow flex-[1.25] h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-display font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.35)] animate-[breath-green_2s_infinite]"
          >
            <MessageCircle size={15} />
            Falar WhatsApp
          </a>
        </div>
      )}

      {/* ANIMATED & PERSONALIZED BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, translateY: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed ${
              showMobileActions ? "bottom-[88px] md:bottom-8" : "bottom-6 md:bottom-8"
            } right-6 z-50 w-12 h-12 rounded-full bg-slate-950/90 backdrop-blur-md border border-red-500 text-red-500 hover:text-white hover:bg-slate-900 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.65)] flex items-center justify-center transition-all cursor-pointer group`}
            aria-label="Voltar para o topo"
          >
            <ChevronUp size={24} className="stroke-[2.5] group-hover:animate-bounce" />
            <span className="absolute inset-0 rounded-full border border-red-500/20 animate-ping opacity-60 pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes breath-red {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(239,68,68,0.25); filter: brightness(1); }
          50% { transform: scale(1.025); box-shadow: 0 0 20px rgba(239,68,68,0.55); filter: brightness(1.15); }
        }
        @keyframes breath-green {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(16,185,129,0.3); filter: brightness(1); }
          50% { transform: scale(1.025); box-shadow: 0 0 20px rgba(16,185,129,0.7); filter: brightness(1.15); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
