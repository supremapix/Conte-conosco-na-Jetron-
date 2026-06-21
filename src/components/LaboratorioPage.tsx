/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Hammer, Aperture, Cpu, Compass, Sliders, Shield, ArrowRight, Zap, Target } from "lucide-react";
import InstagramFeed from "./InstagramFeed";
import VideoSection from "./VideoSection";

interface LaboratorioPageProps {
  onNavigate: (route: string) => void;
}

export default function LaboratorioPage({ onNavigate }: LaboratorioPageProps) {
  const tools = [
    {
      name: "Estação de Rework BGA Jet Common 200V",
      desc: "Estação profissional automatizada para controle preciso de curvas de temperatura para dessolda e resolda segura de chips BGA sem estresse mecânico no PCB.",
      icon: LayersIcon
    },
    {
      name: "Câmera de Imagem Térmica Infravermelha",
      desc: "Varredura instantânea de calor que visualiza pontos aquecidos de curto-circuito em milissegundos, isolando MOSFETs defeituosos sem danificar outras peças.",
      icon: Aperture
    },
    {
      name: "Microscópio Trinocular com Iluminação LED Circular",
      desc: "Zoom micrométrico óptico de alta definição que possibilita a reconstrução segura de trilhas rompidas de 0.05mm e soldagem manual de precisão SMD.",
      icon: Target
    },
    {
      name: "Osciloscópio Digital de 100MHz Dual Channel",
      desc: "Análise de barramentos digitais e oscilações lógicas lendo frequências de BIOS, barramentos I2C, barramentos lógicos e tensões de controle de carregamento.",
      icon: Sliders
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-300 font-sans min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-radial from-red-600/5 via-transparent to-transparent border border-white/5 p-8 sm:p-12 md:p-16 overflow-hidden mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl">
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-xs uppercase font-extrabold px-3 py-1 rounded-full inline-block mb-4 tracking-wider">
              ESTRUTURA DE PONTA
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none mb-4">
              Laboratório Avançado Jetron
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              Investimos constantemente no que há de mais refinado no mundo em ferramentas de microeletrônica. Não terceirizamos serviços: todos os consertos são realizados em nossa bancada em Curitiba por engenheiros e técnicos treinados.
            </p>
            <a
              href="https://wa.me/5541999383882"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-display font-bold rounded-lg text-xs tracking-wider uppercase transition-all shadow-lg shadow-red-600/10"
            >
              Falar com Técnico no Lab
            </a>
          </div>
        </div>

        <VideoSection />

        {/* Instgram Feed Integrado com Título e Descrição do Laboratório Semântico */}
        <div className="mb-16">
          <InstagramFeed 
            category="Laboratório Aberto & Semântico"
            title="Transparência Absoluta nos Reparos"
            description="Nosso laboratório opera sob o princípio da transparência total. Publicamos diariamente em nosso feed análises térmicas sob infravermelho de curtos severos, microscopias ópticas de alta ampliação e o passo a passo cirúrgico sob microscópio de casos reais atendidos no dia."
          />
        </div>

        {/* Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div key={idx} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 hover:border-red-500/20 hover:bg-slate-900/60 transition-all shadow-lg group">
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center text-red-500 mb-4 group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-bold text-white text-base sm:text-lg mb-2">
                  {tool.name}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Standards & E-E-A-T */}
        <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <Shield className="text-red-500 mb-3" size={32} />
              <h4 className="font-display font-bold text-white text-lg mb-2 uppercase">Segurança Antiestática</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Todas as nossas bancadas operam com mantas antiestáticas (ESD) devidamente aterradas e pulseiras de proteção ativa, impossibilitando qualquer dano acidental por eletricidade estática.
              </p>
            </div>
            <div>
              <Zap className="text-red-500 mb-3" size={32} />
              <h4 className="font-display font-bold text-white text-lg mb-2 uppercase">Garantia Integrada</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Nossos testes finais utilizam carregadores originais, fontes redundantes de alta precisão e benchmarks severos por horas antes de liberar o aparelho com nota técnica de garantia.
              </p>
            </div>
            <div>
              <Compass className="text-red-500 mb-3" size={32} />
              <h4 className="font-display font-bold text-white text-lg mb-2 uppercase">Diagnóstico Honesto</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Cobramos exclusivamente pelo reparo efetivo. Se identificarmos que o componente está irreversivelmente condenado de forma inviável, comunicamos o laudo na hora sem taxa de diagnóstico.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Custom simple helper icon representing BGA layered structure
function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
