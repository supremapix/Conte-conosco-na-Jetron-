/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, MapPin, Clock, MessageSquare, Landmark, Navigation, Eye } from "lucide-react";
import { useState } from "react";
import VideoSection from "./VideoSection";

export default function ContatoPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("Rua Imaculada Conceição, 1155, Prado Velho, Curitiba - PR, CEP 80215-901, PUCPR anexo ao DCE");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 text-slate-300 font-sans min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-3 inline-block">
            ATENDIMENTO PRESENCIAL E REMOTO
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none text-center">
            Venha ao Laboratório
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto text-center">
            Estamos estrategicamente localizados em Curitiba, na Rua Imaculada Conceição, 1155, anexo ao DCE da PUCPR (Prado Velho). Oferecemos estacionamento rápido e facilidade de acesso.
          </p>
        </div>

        <div className="mb-12">
          <VideoSection />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Card left: Data metrics */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 space-y-6 shadow-xl flex-grow">
              
              <h3 className="font-display font-bold text-white text-base mb-2 uppercase tracking-wide border-b border-slate-950 pb-3 flex items-center gap-2">
                <Landmark size={16} className="text-red-500" />
                Dados Científicos
              </h3>

              <div className="space-y-4">
                {/* Micro block map */}
                <div className="flex gap-3 text-left">
                  <MapPin className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-display font-bold text-slate-200 text-xs uppercase">Localização Física</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-0.5">
                      Rua Imaculada Conceição, 1155<br />
                      Prado Velho, Curitiba - PR<br />
                      CEP 80.215-901<br />
                      <span className="text-red-500 font-semibold text-[10px] block mt-0.5 font-mono">PUCPR ANEXO AO DCE</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-display font-bold text-slate-200 text-xs uppercase">Horário Operacional</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-0.5">
                      Segunda a Sexta-feira<br />
                      Das <strong className="text-white">09h às 18h</strong> sem fechar ao meio-dia.<br />
                      <span className="text-[10px] text-slate-500 font-mono">Sábados e domingos: Fechado para pesquisas laboratoriais.</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-display font-bold text-slate-200 text-xs uppercase">Telefones Operacionais</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-0.5">
                      Fixo: <a href="tel:4130180964" className="hover:text-white underline">(41) 3018-0964</a><br />
                      WhatsApp: <a href="https://wa.me/5541999383882" className="hover:text-white underline text-red-400 font-bold">(41) 99938-3882</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-display font-bold text-slate-200 text-xs uppercase">Email Oficial</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-0.5 font-mono">
                      jetron.reballing@gmail.com
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick action button copy address */}
            <button
              onClick={handleCopyAddress}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono py-3 rounded-xl transition-all cursor-pointer text-center text-slate-200 flex items-center justify-center gap-2"
            >
              <Navigation size={12} className="text-red-500" />
              {copied ? "✓ Copiado com Sucesso!" : "Copiar Endereço Completo"}
            </button>
          </div>

          {/* Interactive Google Map frame */}
          <div className="lg:col-span-8 bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden p-2 shadow-2xl min-h-[400px] flex flex-col animate-[fadeIn_0.3s_ease] text-left">
            <div className="p-3 bg-slate-950 border-b border-slate-900 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1.5 font-bold">
                <Navigation size={11} className="text-red-500 animate-pulse" />
                PUCPR Anexo ao DCE - Prado Velho - Curitiba
              </span>
              <span className="text-slate-500">Curitiba, PR</span>
            </div>
            
            {/* Embedded maps IFrame */}
            <iframe
              src="https://maps.google.com/maps?q=Rua%20Imaculada%20Concei%C3%A7%C3%A3o%2C%201155%20-%20Prado%20Velho%2C%20Curitiba%20-%20PR%2C%2080215-901&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full flex-grow border-0 rounded-b-xl min-h-[350px]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Endereço da Jetron Curitiba - PUCPR"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
