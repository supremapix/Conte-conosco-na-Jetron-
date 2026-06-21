/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Cpu, Layers, Laptop, Monitor, Smartphone, Gamepad2, CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Service } from "../types";
import VideoSection from "./VideoSection";

interface ServicePageProps {
  service: Service;
}

export default function ServicePage({ service }: ServicePageProps) {
  
  const iconMap: Record<string, any> = {
    "placa-video": Cpu,
    "reballing": Layers,
    "macbook": Laptop,
    "notebook": Monitor,
    "apple": Smartphone,
    "pc-gamer": Gamepad2
  };

  const IconComponent = iconMap[service.id] || Cpu;

  const whatsappMessage = `Olá Jetron! Gostaria de um orçamento para o serviço: "${service.title}".`;

  return (
    <div className="bg-slate-950 text-slate-300 font-sans min-h-screen pt-24 pb-20">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb simulation */}
        <div className="text-[11px] font-mono text-slate-500 mb-6 uppercase tracking-wider flex items-center gap-1.5">
          <span>Serviços Jetron</span>
          <span>/</span>
          <span className="text-slate-300">{service.title}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-16 border-b border-slate-900 pb-16">
          
          <div className="md:col-span-8 space-y-4">
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full inline-block">
              LABORATÓRIO PRÓPRIO CURITIBA
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
              {service.title}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {service.fullDescription}
            </p>
            
            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
              <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl">
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Base de Preço</span>
                <span className="font-display font-bold text-white text-xs mt-0.5 block">{service.pricingRange}</span>
              </div>
              <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl">
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Tempo de Bancada</span>
                <span className="font-display font-bold text-red-500 text-xs mt-0.5 block">{service.estimatedTime}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex items-center justify-center">
            <div className="w-48 h-48 rounded-3xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-red-600 shadow-2xl relative">
              <div className="absolute inset-0 rounded-3xl bg-red-600/5 blur-xl pointer-events-none" />
              <IconComponent size={72} strokeWidth={1.5} />
            </div>
          </div>

        </div>

        <div className="mb-16">
          <VideoSection />
        </div>

        {/* Features list */}
        <div className="space-y-6 mb-16">
          <h3 className="font-display font-black text-xl text-white tracking-tight flex items-center gap-2">
            <ShieldCheck size={20} className="text-red-500" />
            O que está incluso no procedimento técnico:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, i) => (
              <div key={i} className="flex gap-3 bg-slate-900/20 border border-slate-900 p-4 rounded-xl items-start">
                <CheckCircle2 size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-6 mb-16 border-t border-slate-900 pt-16">
            <h3 className="font-display font-black text-xl text-white tracking-tight">
              Dúvidas Frequentes sobre {service.title}
            </h3>
            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900/30 border border-slate-900 rounded-xl p-5">
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Conversion CTA */}
        <div className="bg-gradient-to-r from-red-950/30 to-slate-900/50 border border-red-500/10 rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-red-600/[0.02] pointer-events-none" />
          
          <Sparkles className="text-red-500 animate-pulse mx-auto mb-4" size={24} />
          <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight mb-2">
            Precisa recuperar seu aparelho com quem realmente entende?
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto mb-6">
            Traga seu equipamento para o nosso laboratório em frente à PUC Paraná ou solicite nosso serviço de busca segura em Curitiba. Diagnóstico transparente e honesto.
          </p>
          
          <a
            href={`https://wa.me/5541999383882?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-display font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl cursor-pointer shadow-xl transition-all"
          >
            <Phone size={14} />
            Agendar reparo via WhatsApp (41) 99938-3882
          </a>
        </div>

      </div>

    </div>
  );
}
