/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Instagram, Eye, HelpCircle } from "lucide-react";
import { useState } from "react";

interface InstagramFeedProps {
  title?: string;
  description?: string;
  category?: string;
}

export default function InstagramFeed({ title, description, category }: InstagramFeedProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <section className="py-16 bg-slate-950/40 border-b border-slate-900 font-sans relative overflow-hidden">
      {/* Background soft lighting glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-red-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500/10 via-pink-500/5 to-purple-500/10 border border-red-500/20 rounded-full px-3.5 py-1 text-red-500 font-mono text-[10px] uppercase font-bold tracking-wider mb-3"
          >
            <Instagram size={12} className="text-red-500" />
            {category || "@jetron.repair"}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight"
          >
            {title || "Acompanhe Nosso Feed do Instagram"}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto"
          >
            {description || "Mostramos bastidores reais do laboratório em Curitiba, microscopia de placas, solda BGA e análise de falhas complexas em tempo real."}
          </motion.p>
        </div>

        {/* Embedded Iframe Container - optimized to prevent the white trailing void */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-1 shadow-2xl shadow-black/80 max-h-[380px] sm:max-h-[440px] md:max-h-[450px]"
        >
          {hasError ? (
            <div className="flex flex-col items-center justify-center h-[320px] sm:h-[400px] text-center p-6 text-slate-400">
              <Instagram size={48} className="text-slate-700 mb-3" />
              <h4 className="font-display font-bold text-slate-200">Não foi possível exibir o feed do Instagram</h4>
              <p className="text-xs max-w-sm mt-1.5 text-slate-500">
                O Instagram limita os embeds em alguns ambientes de sandbox. Toque no botão abaixo para interagir diretamente com o nosso perfil oficial.
              </p>
            </div>
          ) : (
            <iframe
              src="https://www.instagram.com/jetron.repair/embed"
              className="w-full h-[370px] sm:h-[430px] md:h-[440px] rounded-xl border-0 overflow-hidden bg-slate-950"
              loading="lazy"
              scrolling="no"
              allowtransparency="true"
              title="Feed Instagram do Lab Jetron"
              onError={() => setHasError(true)}
            />
          )}
        </motion.div>

        {/* Dynamic CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <a
            href="https://www.instagram.com/jetron.repair/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-display font-black text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/15 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Instagram className="h-5 w-5" />
            Seguir no Instagram
          </a>
          <span className="text-[10px] text-slate-500 uppercase font-mono">
            🔥 Novidades Diárias Técnicas de Reparo
          </span>
        </motion.div>

      </div>
    </section>
  );
}
