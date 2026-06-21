/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Users, Award, ShieldCheck, Microscope, HeartHandshake, Phone, ArrowRight } from "lucide-react";
import VideoSection from "./VideoSection";

interface QuemSomosPageProps {
  onNavigate: (route: string) => void;
}

export default function QuemSomosPage({ onNavigate }: QuemSomosPageProps) {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-32 pb-24 font-sans">
      
      {/* Hero Header with requested background image */}
      <section 
        className="relative py-20 md:py-28 text-center overflow-hidden border-b border-slate-900 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.85) 0%, rgba(2, 6, 23, 0.98) 100%), url('https://dlcdnwebimgs.asus.com/files/media/45EF471F-D0EE-43A1-9027-DD942D32ECA2/v1/img/kv-cover.png')`
        }}
      >
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-500/30 text-red-400 font-mono text-[11px] uppercase font-bold px-4 py-1.5 rounded-full">
            Nossa História e Compromisso
          </span>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight leading-none text-center">
            Quem Somos - <span className="text-red-500">Jetron</span>
          </h1>
          <p className="text-slate-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto text-center">
            Referência técnica em Curitiba. Combinamos engenharia especializada, laboratório equipado e honestidade absoluta para salvar o seu patrimônio tecnológico.
          </p>
        </div>
      </section>

      <VideoSection />

      {/* Main Narrative Section with second background image overlay on the sides */}
      <section 
        className="py-16 md:py-24 relative bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.95)), url('https://www.adrenaline.com.br/wp-content/uploads/2021/06/asus-rtx-3080-3070-chamada.jpg')`
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h2 className="font-display font-black text-2xl md:text-3xl text-left text-white border-l-4 border-red-600 pl-4 tracking-tight">
                Mais de 9 Anos Salvando Placas e Equipamentos Que as Autorizadas Condenam
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed text-left">
                Fundada com o firme propósito de oferecer diagnósticos precisos e reparabilidade real, a <strong>Jetron</strong> nasceu em Curitiba para contestar a cultura do descarte de hardware de alto desempenho.
              </p>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed text-left">
                Enquanto a maioria das assistências e autorizadas convencionais opta pelo caminho fácil de "recomendar a troca da placa-mãe inteira" – gerando orçamentos absurdamente caros e inviáveis –, nosso foco está em localizar o microcomponente individual responsável pela falha (DrMOS, capacitores, reguladores PWM ou esferas BGA) e substituí-lo de forma cirúrgica na bancada.
              </p>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed text-left">
                Estamos localizados estrategicamente anexo ao DCE da PUCPR, no bairro Prado Velho em Curitiba, prontos para receber você com transparência, laudo gratuito e facilidade de estacionamento rápido.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
                <img 
                  src="https://www.adrenaline.com.br/wp-content/uploads/2021/06/asus-rtx-3080-3070-chamada.jpg" 
                  alt="Laboratório de Tecnologia Jetron" 
                  className="w-full h-80 object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/95 border border-slate-800 rounded-xl">
                  <div className="flex gap-3 items-center">
                    <div className="p-2.5 rounded-lg bg-red-600 text-white text-xs font-bold">PUCPR</div>
                    <div>
                      <p className="text-white text-xs font-bold text-left">Nosso Endereço em Curitiba:</p>
                      <p className="text-slate-300 text-[11px] text-left">Rua Imaculada Conceição, 1155 — Prado Velho (Próximo à PUC PR, anexo ao DCE)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Bento Grid - Optimized for absolute simplicity and elderly readability as well */}
      <section className="py-16 bg-slate-900/40 border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-red-500 font-mono text-[10px] uppercase font-bold tracking-widest block">O que guia os nossos passos</span>
            <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight text-center">Nossos Pilares Fundamentais</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-slate-950 border border-slate-900 p-8 rounded-2xl shadow-xl flex flex-col items-start text-left space-y-4 hover:border-red-500/20 transition-all">
              <div className="p-3.5 rounded-xl bg-slate-900 text-red-500">
                <Microscope size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Tecnologia Cirúrgica</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Utilizamos equipamentos industriais calibrados para micro-eletrônica: estações de rework BGA infravermelhas e microscópios ópticos que permitem soldagem perfeita em silício sem causar delaminação no circuito original.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-950 border border-slate-900 p-8 rounded-2xl shadow-xl flex flex-col items-start text-left space-y-4 hover:border-red-500/20 transition-all">
              <div className="p-3.5 rounded-xl bg-slate-900 text-red-500">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Transparência Extrema</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Cada orçamento vem acompanhado de imagens explicativas do microscópio ou câmera térmica mostrando o real foco e defeito do seu equipamento. Na Jetron, você entende e acompanha exatamente o reparo executado.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-950 border border-slate-900 p-8 rounded-2xl shadow-xl flex flex-col items-start text-left space-y-4 hover:border-red-500/20 transition-all">
              <div className="p-3.5 rounded-xl bg-slate-900 text-red-500">
                <HeartHandshake size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Atendimento Humano</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Prestamos suporte atencioso, didático e sem jargões confusos. Conversamos de forma simples e direta, ajudando todas as gerações – incluindo jovens estudantes da PUCPR e idosos com seus laptops de fotos e lembranças de família.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Reassurance Call To Action in About Us */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-red-950/20 to-slate-900/40 border border-slate-900 p-8 md:p-12 rounded-3xl space-y-6">
          <h2 className="font-display font-black text-2xl md:text-3xl text-center text-white leading-tight">
            Seu Dispositivo Está Inoperante no Momento?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto text-center col-span-1">
            Não tome decisões precipitadas e evite descartar seu laptop ou placa premium sem antes fazer um diagnóstico gratuito focado em engenharia eletrônica na Jetron.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="https://wa.me/5541999383882"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold font-display uppercase text-xs px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-red-600/15"
            >
              Falar com Técnico (WhatsApp)
            </a>
            <button
              onClick={() => onNavigate("/contato")}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-slate-300 font-sans text-xs px-6 py-3.5 rounded-xl border border-slate-800 transition-all inline-flex items-center justify-center gap-1.5"
            >
              Ver Endereço e Fone <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
