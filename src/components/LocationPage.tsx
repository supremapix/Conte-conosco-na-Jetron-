/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Shield, Truck, Calendar, Sparkles, Navigation, Phone, ChevronRight } from "lucide-react";
import { Neighborhood, SurroundingCity } from "../types";
import VideoSection from "./VideoSection";

interface LocationPageProps {
  locationType: "bairro" | "cidade";
  locationName: string;
  isOfficial?: boolean;
}

export default function LocationPage({ locationType, locationName, isOfficial = true }: LocationPageProps) {
  
  const whatsappMsg = `Olá Jetron! Estou localizado em ${locationName} (${locationType === 'bairro' ? 'Curitiba' : 'Região Metropolitana'}) e gostaria de solicitar informações para reparo técnico de equipamento.`;

  return (
    <div className="bg-slate-950 text-slate-300 font-sans min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic header breadcrumb */}
        <div className="text-[11px] font-mono text-slate-500 mb-6 uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
          <span>Área de Cobertura Jetron</span>
          <span>/</span>
          <span className="text-slate-300">{locationType === "bairro" ? "Curitiba - PR" : "RMC"}</span>
          <span>/</span>
          <span className="text-red-500">{locationName}</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-slate-900/30 border border-slate-900 p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-4">
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[9px] uppercase font-bold px-3 py-1 rounded-full inline-block tracking-wider">
              {locationType === "bairro" && isOfficial ? "Bairro Oficial de Curitiba - IPPUC" : locationType === "bairro" ? "Setor / Região Popular de Curitiba" : "Região Metropolitana Integrada"}
            </span>
            
            <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              Conserto de Placa de Vídeo e Notebook para moradores do {locationType === "bairro" ? "Bairro" : "Município"} <span className="text-red-500">{locationName}</span>
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Dificuldades para encontrar assistência técnica de alta confiança, equipada com estações infravermelhas e análise microscópica em {locationName}? A <strong className="text-white">Jetron</strong> é o seu suporte definitivo em informática. Moradores de {locationName} contam com canais expressos de agendamento e recolhimento seguro de hardware.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={`https://wa.me/5541999383882?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-500 text-white font-display uppercase font-bold text-xs tracking-wider px-6 py-3 rounded-xl cursor-pointer shadow-lg shadow-red-600/10 transition-all text-center"
              >
                Solicitar Suporte em {locationName}
              </a>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <VideoSection />
        </div>

        {/* Cards mapping dynamic proximity and recovery methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 hover:border-red-500/20 transition-all">
            <Truck className="text-red-500 mb-3" size={24} />
            <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase mb-1">Coleta & Entrega Segura</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Se você não puder vir ao nosso laboratório no Prado Velho, oferecemos serviço opcional de busca integrada para {locationName}. Seu hardware é transportado em embalagem antiestática vedada.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 hover:border-red-500/20 transition-all">
            <Shield className="text-red-500 mb-3" size={24} />
            <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase mb-1">Procedência de Bancada</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Todos os testes e laudos são gravados e monitorados. Desde a entrada na bancada até a montagem final térmica, cada solda é inspecionada sob lentes de microscópio óptico.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 hover:border-red-500/20 transition-all">
            <Calendar className="text-red-500 mb-3" size={24} />
            <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase mb-1">Garantia Industrial</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Não fazemos reparos provisórios. Cada capacitor, DrMOS ou fase de VRAM trocado possui garantia integral por escrito, cobrindo o uso do dispositivo em regime máximo de estresse.
            </p>
          </div>

        </div>

        {/* Explicit Landmark Navigation Block */}
        <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 md:max-w-xl text-center md:text-left">
            <h3 className="font-display font-black text-white text-lg tracking-tight">Onde Fica o Nosso Laboratório Central?</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Rua Imaculada Conceição, 1155, Prado Velho, Curitiba - PR, CEP 80.215-901. Localizados estrategicamente anexo ao <strong className="text-red-500">DCE da PUCPR</strong>. Venha nos visitar diretamente de {locationName} com estacionamento fácil e atendimento presencial rápido de segunda a sexta-feira.
            </p>
          </div>
          
          <div className="shrink-0 space-y-2 text-center">
            <div className="font-mono text-white text-xs font-bold">📲 WhatsApp Expresso:</div>
            <a
              href="https://wa.me/5541999383882"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 border border-slate-800 hover:border-red-500/40 text-slate-200 hover:text-white text-xs font-mono px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-1.5"
            >
              (41) 99938-3882
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
