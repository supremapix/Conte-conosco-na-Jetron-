/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Heart, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ExternalLink } from "lucide-react";
import { ALL_NEIGHBORHOODS, SURROUNDING_CITIES } from "../data";

interface FooterProps {
  onNavigate: (route: string) => void;
  currentRoute: string;
  onOpenElderlyMenu?: () => void;
}

export default function Footer({ onNavigate, currentRoute, onOpenElderlyMenu }: FooterProps) {
  // Let's grab some major neighborhoods for display to keep the footer aesthetic and balanced
  const featuredBairros = ALL_NEIGHBORHOODS.filter(n => 
    ["Batel", "Água Verde", "Bigorrilho", "Centro", "Prado Velho", "Portão", "Cabral", "Mercês", "Santa Felicidade", "Cidade Industrial (CIC)"]
    .includes(n.name)
  );

  const featuredCities = SURROUNDING_CITIES.slice(0, 8);

  const handleLinkClick = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className="relative border-t border-slate-900/80 pt-16 pb-12 text-slate-300 text-sm font-sans bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(2, 6, 23, 0.96) 0%, rgba(9, 15, 35, 0.98) 100%), url('https://dlcdnwebimgs.asus.com/files/media/45EF471F-D0EE-43A1-9027-DD942D32ECA2/v1/img/kv-cover.png')`
      }}
    >
      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 cursor-pointer justify-start" onClick={(e) => handleLinkClick(e, "/")}>
              <span className="font-display font-black text-2xl tracking-tighter text-white">
                JETR<span className="text-red-500">O</span>N
              </span>
              <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                PRO LAB
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Assistência técnica em Curitiba especializada em microeletrônica de alto nível. Diagnóstico térmico por infravermelho de placas de vídeo, MacBooks, consoles e notebooks gamer de última geração.
            </p>
            
            {/* Quick Link/Helper for Elderly */}
            {onOpenElderlyMenu && (
              <div className="pt-2">
                <button
                  id="elderly-footer-trigger"
                  type="button"
                  onClick={onOpenElderlyMenu}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs px-4 py-3 rounded-xl shadow-lg border border-yellow-400 font-sans tracking-wide transition-all uppercase flex items-center justify-center gap-2"
                >
                  👵 MODO FACILITADO (IDOSOS)
                </button>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.instagram.com/jetron.repair/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-500 transition-all">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/people/Jetron-Reballing-E-Tecnologia/100063768222384/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-500 transition-all">
                <Facebook size={16} />
              </a>
              <a href="https://www.linkedin.com/company/jetron-reballing" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-500 transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Contact Details with highly visible styling for older adults */}
          <div className="space-y-4 text-left">
            <h4 className="font-display font-black text-white text-base tracking-wider uppercase border-b border-white/10 pb-2">
              Telefone e Endereço
            </h4>
            <ul className="space-y-4 text-sm leading-relaxed">
              <li className="flex items-start gap-2.5">
                <MapPin className="text-red-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-200">
                  <strong className="text-white text-base">Rua Imaculada Conceição, 1155</strong><br />
                  Bairro Prado Velho, Curitiba - PR<br />
                  CEP 80.215-901<br />
                  <span className="bg-red-600/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase inline-block mt-1">
                    ANEXO AO DCE DA PUCPR
                  </span>
                </span>
              </li>
              
              {/* Phone 1: Clique para Ligar - extremely high-contrast and clear */}
              <li className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Phone className="text-green-500 shrink-0" size={18} />
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">LIGAR NO FIXO (Clique abaixo):</span>
                  <a href="tel:4130180964" className="text-white font-extrabold text-base hover:text-green-400 transition-colors">
                    (41) 3018-0964
                  </a>
                </div>
              </li>

              {/* Phone 2: Whatsapp - extremely high-contrast and clear */}
              <li className="flex items-center gap-2.5 bg-green-950/30 p-2.5 rounded-xl border border-green-900/30">
                <span className="text-green-400 shrink-0 font-bold text-lg leading-none">💬</span>
                <div>
                  <span className="block text-[10px] text-green-400 font-bold uppercase">WHATSAPP (Clique abaixo):</span>
                  <a href="https://wa.me/5541999383882" target="_blank" rel="noopener noreferrer" className="text-green-300 font-extrabold text-base hover:text-green-200 transition-colors">
                    (41) 99938-3882
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="text-red-500 shrink-0" size={14} />
                <a href="mailto:jetron.reballing@gmail.com" className="hover:text-white transition-colors text-xs break-all">
                  jetron.reballing@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Local SEO Neighborhoods Directory */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase">
              Bairros Atendidos (Curitiba)
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px]">
              {featuredBairros.map(b => (
                <a
                  key={b.slug}
                  href={`/bairro/${b.slug}`}
                  onClick={(e) => handleLinkClick(e, `/bairro/${b.slug}`)}
                  className={`hover:text-red-500 transition-colors truncate block ${currentRoute === `/bairro/${b.slug}` ? 'text-red-500 font-semibold' : ''}`}
                >
                  📍 {b.name}
                </a>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 pt-1 leading-normal">
              Atendimento especializado com recolhimento e testes monitorados para todos os bairros oficiais e loteamentos.
            </p>
          </div>

          {/* Surrounding Cities */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase">
              Região Metropolitana
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px]">
              {featuredCities.map(c => (
                <a
                  key={c.slug}
                  href={`/cidade/${c.slug}`}
                  onClick={(e) => handleLinkClick(e, `/cidade/${c.slug}`)}
                  className={`hover:text-red-500 transition-colors truncate block ${currentRoute === `/cidade/${c.slug}` ? 'text-red-500 font-semibold' : ''}`}
                >
                  🚗 {c.name}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-900">
              <h5 className="font-display font-bold text-xs text-white mb-2 uppercase">
                Receber Boletim Técnico
              </h5>
              <form className="flex gap-1" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Seu email"
                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 outline-none focus:border-red-500/50 w-full"
                />
                <button type="submit" className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded transition-colors shrink-0">
                  OK
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Dynamic Directory links block for SEO strength */}
        <div className="mt-12 pt-8 border-t border-slate-900/60 text-slate-500 text-[11px] leading-relaxed text-center">
          <p className="max-w-4xl mx-auto">
            Palavras-chave regionais indexadas: <span className="text-slate-400 font-mono">conserto de placa de vídeo Curitiba, reballing Curitiba, conserto macbook Curitiba, assistência técnica apple Curitiba, reparo de bga Prado Velho, montagem pc gamer Curitiba, conserto placa mãe, recuperação de dados curitiba puca.</span>
          </p>
        </div>

        {/* Mandatory SupremaCredit with heartbeat */}
        <SupremaCredit />
      </div>
    </footer>
  );
}

export function SupremaCredit() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 border-t border-slate-800/50 flex justify-center items-center">
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-full px-6 py-2.5 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
        <p className="text-slate-200 hover:text-white transition-colors duration-200 text-sm sm:text-base font-bold flex flex-wrap items-center justify-center gap-2">
          <span className="opacity-90">Desenvolvido com</span> 
          
          {/* Coração pulsante com efeito de sombra */}
          <Heart 
            size={14} 
            className="text-red-500 animate-[pulse_1.5s_infinite] shrink-0 filter drop-shadow-[0_0_3px_rgba(239,68,68,0.7)]" 
          /> 
          
          <span className="opacity-90">por</span>
          
          {/* Link para o site da Suprema */}
          <a 
            id="developer-suprema-link"
            href="https://supremasite.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-yellow-400 hover:text-yellow-300 transition-all font-black inline-flex items-center gap-2 cursor-pointer border-b border-dashed border-yellow-400/50 hover:border-yellow-300"
          >
            Suprema Sites Express
            
            {/* Logotipo oficial com efeito de iluminação */}
            <img 
              src="https://img.supremamidia.com/suprema-img.png" 
              alt="Suprema" 
              className="h-[18px] w-auto inline select-none shrink-0 filter drop-shadow-[0_0_2px_rgba(250,204,21,0.5)] transition-transform duration-300 hover:scale-110" 
              referrerPolicy="no-referrer"
            />
          </a>
        </p>
      </div>
    </div>
  );
}
