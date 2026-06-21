/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Cpu, AlertTriangle, Hammer, CornerDownRight, Phone, Send, ChevronRight } from "lucide-react";
import VideoSection from "./VideoSection";

export default function DiagnosticoIAPage() {
  const [deviceType, setDeviceType] = useState("placa-video");
  const [model, setModel] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<any | null>(null);
  const [errorText, setErrorText] = useState("");

  const steps = [
    "Inicializando Copiloto de Microeletrônica...",
    "Varrendo pinagem lógica de barramentos secundários...",
    "Cross-referenciando esquemas elétricos com casuísticas gravadas na Jetron...",
    "Estruturando causas eletrônicas de falha..."
  ];

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setErrorText("Por favor, descreva os sintomas do seu aparelho para que nossa IA possa processar.");
      return;
    }
    setErrorText("");
    setLoading(true);
    setResult(null);
    setLoadingStep(0);

    // Dynamic timer steps for tech atmosphere
    const timer = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceType, model, symptoms })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setErrorText("Não foi possível conectar ao servidor técnico da Jetron. Tente novamente em alguns segundos.");
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-300 font-sans min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4">
            <Sparkles size={11} className="animate-pulse" />
            VIRTUAL ENGINEER SERVICE
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
            Diagnóstico IA Inteligente
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Descreva detalhadamente as falhas do seu dispositivo. Nossa inteligência artificial calibrada com dados eletrônicos da Jetron irá deduzir as prováveis falhas de hardware da sua máquina.
          </p>
        </div>

        <div className="mb-12">
          <VideoSection />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Diagnostic Form Input */}
          <div className="md:col-span-5 bg-slate-900/30 border border-slate-900 rounded-2xl p-6 shadow-xl">
            <h3 className="font-display font-bold text-white text-base mb-4 flex items-center gap-2">
              <Cpu size={16} className="text-red-500" />
              Sintomas Lógicos
            </h3>
            
            <form onSubmit={handleDiagnose} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Tipo de Equipamento
                </label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-red-500/50 outline-none"
                >
                  <option value="placa-video">💻 Placa de Vídeo (GPU)</option>
                  <option value="macbook">🍏 MacBook / Apple</option>
                  <option value="notebook">💻 Notebook Comum / Gamer</option>
                  <option value="console">🎮 Console (PS5, Xbox, Switch)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Marca / Modelo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: RTX 3080 ASUS ROG, M1 Pro 14\"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-red-500/50 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Descrições do Sintoma
                </label>
                <textarea
                  rows={4}
                  placeholder="O que está acontecendo? (Ex: 'Dá um bipe e desliga', 'Sinal some após começar a jogar', 'Entrou em curto pós cair líquido')"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-red-500/50 outline-none resize-none leading-relaxed"
                />
              </div>

              {errorText && (
                <div className="p-2.5 bg-red-500/10 border border-red-500/25 rounded text-[11px] text-red-500 font-medium">
                  ⚠️ {errorText}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 transition-all font-display text-white uppercase font-bold text-xs tracking-wider py-3 px-4 rounded-xl cursor-pointer disabled:bg-slate-800 disabled:text-slate-500"
              >
                {loading ? "Processando Análise..." : "Analisar Hardware"}
              </button>
            </form>
          </div>

          {/* Diagnostic Outputs */}
          <div className="md:col-span-7 h-full">
            <div className="min-h-[380px] bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl p-6 flex flex-col justify-between shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {/* Loader screen */}
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center h-full my-auto"
                  >
                    <div className="relative w-14 h-14 mb-4">
                      <div className="absolute inset-0 rounded-full border-2 border-red-600/10 animate-ping" />
                      <div className="absolute inset-2 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                    </div>
                    <h4 className="font-display font-medium text-white text-sm">Escaneando Dispositivo</h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-1.5 animate-pulse max-w-sm">
                      {steps[loadingStep]}
                    </p>
                  </motion.div>
                )}

                {/* Empty State screen */}
                {!loading && !result && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-slate-600 border border-slate-900 mb-4">
                      <Sparkles size={20} />
                    </div>
                    <h4 className="font-display font-bold text-slate-400 text-sm">Aguardando Parâmetros</h4>
                    <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                      Preencha o formulário eletrônico ao lado e inicie o motor de inteligência artificial de bancada da Jetron.
                    </p>
                  </motion.div>
                )}

                {/* Success results display */}
                {!loading && result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Telemetry Pills */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900/50 border border-slate-900 rounded-xl">
                        <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Nível de Severidade</span>
                        <div className="text-red-400 font-display font-bold text-xs uppercase mt-0.5 flex items-center gap-1.5">
                          <AlertTriangle size={12} />
                          {result.severity || "Média"}
                        </div>
                      </div>
                      <div className="p-3 bg-slate-900/50 border border-slate-900 rounded-xl">
                        <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Complexidade do Reparo</span>
                        <div className="text-blue-400 font-display font-bold text-xs uppercase mt-0.5 flex items-center gap-1.5">
                          <Hammer size={12} />
                          {result.complexity || "Média"}
                        </div>
                      </div>
                    </div>

                    {/* Causes Grid */}
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Causas Eletrônicas Prováveis:</h4>
                      <ul className="space-y-2">
                        {result.possibleCauses?.map((cause: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-xs">
                            <CornerDownRight size={12} className="text-red-500 shrink-0 mt-0.5" />
                            <span className="text-slate-300 font-medium leading-relaxed">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Recommendation */}
                    <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl">
                      <h4 className="text-[10px] font-mono text-red-500 uppercase tracking-wider mb-1 font-bold">Recomendação Profissional de Bancada:</h4>
                      <p className="text-xs text-slate-400 leading-normal">
                        {result.recommendation}
                      </p>
                      <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5 font-mono">
                        <span>Estimativa de Custo:</span>
                        <strong className="text-white">{result.priceEstimate || "Gratuito"}</strong>
                      </div>
                    </div>

                    {/* Meta warning */}
                    {result.note && (
                      <p className="text-[10px] text-slate-600 leading-normal italic">
                        {result.note}
                      </p>
                    )}

                    {/* Massive WhatsApp checkout block */}
                    <a
                      href={`https://wa.me/5541999383882?text=${encodeURIComponent(result.whatsappMessage || "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all text-white font-display uppercase font-black text-xs tracking-wider py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/10 flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <Phone size={14} />
                      Enviar Diagnóstico IA ao WhatsApp Jetron (41) 99938-3882
                      <ChevronRight size={14} />
                    </a>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
