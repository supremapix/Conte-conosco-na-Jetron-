import React from "react";
import { motion } from "motion/react";
import { Cpu, Play, Terminal } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="bg-slate-950 py-16 border-b border-subtle border-slate-900 font-sans relative overflow-hidden">
      {/* Visual background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Technical title block */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
          >
            <Terminal size={12} className="text-red-500 animate-pulse" />
            Vídeotecnia de Bancada & Diagnósticos
          </motion.div>
          
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Veja Nosso Laboratório em Ação
          </h3>
          
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Assista a um de nossos diagnósticos cirúrgicos e procedimentos reais de reballing BGA em nosso laboratório próprio de Curitiba.
          </p>
        </div>

        {/* Dynamic Responsive Video Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-black/80 p-1 group"
        >
          {/* Decorative scanner line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-40 animate-pulse pointer-events-none" />
          
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 relative">
            <iframe
              src="https://www.youtube-nocookie.com/embed/KH_kf_8-LgI"
              title="Jetron Repair Rework & Lab Showcase"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>
        </motion.div>

        {/* Footnote status */}
        <div className="flex items-center justify-between mt-4 text-[10px] uppercase font-mono text-slate-500 font-bold px-1">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Exibição Ativa de Bancada
          </span>
          <span className="text-slate-600">ID: KH_kf_8-LgI</span>
        </div>

      </div>
    </section>
  );
}
