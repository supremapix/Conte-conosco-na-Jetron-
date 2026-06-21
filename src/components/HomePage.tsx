/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Layers, Laptop, Smartphone, Gamepad2, Phone, Sparkles, CheckCircle, ChevronDown, Award, Star, Microscope, ShieldAlert, ArrowRight, CornerDownRight, Apple, Flame, Zap, Rocket, Briefcase, Printer } from "lucide-react";
import { SERVICES, REPAIR_CASES } from "../data";
import InstagramFeed from "./InstagramFeed";
import VideoSection from "./VideoSection";

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [isBefore, setIsBefore] = useState(false); // Before/After toggle for high simplicity and interaction
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const stats = [
    { value: "R$ 10M+", label: "Economizados em novas placas pelos clientes" },
    { value: "15,000+", label: "Hardware e notebooks recuperados" },
    { value: "09 anos", label: "De pesquisa técnica em Curitiba" },
    { value: "100%", "label": "Garantia e transparência de bancada" }
  ];

  const brands = [
    { name: "Apple", logo: "🍎" },
    { name: "Asus", logo: "🎮" },
    { name: "Gigabyte", logo: "🔥" },
    { name: "MSI", logo: "🐉" },
    { name: "Acer", logo: "🚀" },
    { name: "Dell", logo: "💼" },
    { name: "Lenovo", logo: "💻" },
    { name: "HP", logo: "🖨️" },
    { name: "Samsung", logo: "📱" }
  ];

  const testimonials = [
    {
      name: "Lorran Paganini",
      review: "Honestidade no diagnóstico e cobrança super justa. Mandaram foto microscópica do componente queimado na mesma tarde.",
      stars: 5,
      date: "Há 1 mês"
    },
    {
      name: "Chris Ferreira",
      review: "Recuperaram uma placa de vídeo RTX 2080 Ti que outra assistência conceituada de Curitiba condenou como sucata. Reballing impecável, funcionando perfeitamente nos meus renderizadores 3D.",
      stars: 5,
      date: "Há 3 meses"
    },
    {
      name: "João Bernardo Bresolin",
      review: "Eficiência e preço justo. Atendimento atencioso anexo à PUC PR Prado Velho. Recomendo para todos os alunos e profissionais.",
      stars: 5,
      date: "Há 2 meses"
    }
  ];

  const generalFaqs = [
    {
      q: "Como funciona o orçamento na Jetron?",
      a: "O pré-diagnóstico com laudo preliminar e estimativa de orçamento é 100% gratuito. Você pode trazer o aparelho ao laboratório no Prado Velho ou nos enviar a descrição completa pelo WhatsApp."
    },
    {
      q: "O que é Reballing e quando ele é necessário?",
      a: "O Reballing é a troca física completa das soldas BGA que ligam os chips integrados (GPU, Processador) à placa. É necessário para sanar panes térmicas, bipes anômalos de erro ou o famoso sintoma de 'liga mas não dá vídeo'."
    },
    {
      q: "Vocês atendem outras marcas além da Apple e Nvidia?",
      a: "Sim! Somos um laboratório multimarcas altamente equipado: atendemos notebooks Acer, Asus, Lenovo, HP, Dell, placas de vídeo AMD Radeon e consoles PlayStation, Xbox e Nintendo."
    },
    {
      q: "Qual o prazo médio de um reparo de placa lógico?",
      a: "A maioria dos diagnósticos e microsoldas eletrônicas sob microscópio é concluída em até 2 a 5 dias úteis, garantindo testes térmicos e bench de resistência por mais de 6 horas."
    }
  ];

  const handleServiceClick = (slug: string) => {
    onNavigate(`/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const serviceIcons: Record<string, any> = {
    "placa-video": Cpu,
    "reballing": Layers,
    "macbook": Laptop,
    "notebook": Laptop,
    "apple": Smartphone,
    "pc-gamer": Gamepad2
  };

  const activeCase = REPAIR_CASES[activeCaseIdx];

  return (
    <div className="bg-slate-950 text-slate-300 font-sans min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative pt-32 pb-24 overflow-hidden border-b border-slate-900 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 6, 23, 0.94) 0%, rgba(9, 15, 35, 0.98) 100%), url('https://dlcdnwebimgs.asus.com/files/media/45EF471F-D0EE-43A1-9027-DD942D32ECA2/v1/img/kv-cover.png')`
        }}
      >
        {/* Neon hardware graphic background effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero text copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full mx-auto lg:mx-0">
                <Microscope size={12} className="text-red-500" />
                Destaque Nacional em Reparabilidade de Placas de Vídeo
              </div>

              <h1 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tight leading-none text-center lg:text-left">
                Conserto de MacBook, <br />
                <span className="text-red-500 text-glow-red">Placa de Vídeo</span> e <br />
                Notebook em Curitiba
              </h1>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-xl text-center lg:text-left">
                Especialistas em microeletrônica de alto nível e reballing avançado. Onde as autorizadas condenam a placa, nós localizamos o micro-componente queimado sob microscopia de precisão e devolvemos a utilidade à sua máquina de forma definitiva.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto justify-center lg:justify-start">
                <a
                  href="https://wa.me/5541999383882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-500 text-white font-display uppercase font-black text-xs tracking-wider px-8 py-4 rounded-xl text-center shadow-lg shadow-red-600/20 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Falar no WhatsApp (41) 99938-3882
                </a>
                <a
                  href="tel:4130180964"
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-mono text-xs px-6 py-4 rounded-xl text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  📞 Ligue: (41) 3018-0964
                </a>
              </div>

              {/* Badges indicators */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-slate-900 text-[10px] uppercase font-mono text-slate-500 font-bold justify-center lg:justify-start w-full">
                <span className="flex items-center gap-1.5"><CheckCircle size={10} className="text-red-500" /> Laboratório Próprio</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={10} className="text-red-500" /> Próximo à PUC PR</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={10} className="text-red-500" /> Orçamento Sem Taxa</span>
              </div>
            </div>

            {/* Hero graphics block */}
            <div className="lg:col-span-5 relative">
              <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-2xl relative">
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600/10 border border-red-500/20 rounded px-2 py-0.5 text-red-500 font-mono text-[9px]">
                  <span>●</span> 200°C REWORK PROFILE ATIVO
                </div>
                
                {/* Diagnostics graphic animation */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-950">
                    <span className="font-display font-bold text-xs text-slate-200">BANCADA TECNOLÓGICA</span>
                    <span className="font-mono text-[10px] text-slate-500">CANAL DE CONTROLE</span>
                  </div>
                  
                  <div className="space-y-2 font-mono text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estação Rework BGA:</span>
                      <span className="text-white">Jet Common Infra</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Impedância barramento PCIe:</span>
                      <span className="text-green-500">OK - 14.2 Ω</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estufa de Desumidificação:</span>
                      <span className="text-white">60°C - 24 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Insumos de Solda:</span>
                      <span className="text-red-400">Amtech Original</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                    <p className="text-slate-300 text-xs italic leading-relaxed">
                      &ldquo;O chip da placa de vídeo passa por um processo seguro e calibrado. Cada reballing reestabelece a elasticidade física ideal para evitar que o erro ocorra novamente.&rdquo;
                    </p>
                    <span className="block text-[9px] text-slate-500 font-mono mt-2 text-right">— Eng. de Processos Jetron</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <VideoSection />

      {/* 2. STATS BAR */}
      <section className="bg-slate-950 py-12 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] text-slate-500 sm:text-xs uppercase font-mono tracking-wider font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="py-24 bg-slate-950/40 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-2">
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full">Nossas frentes de atuação</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">Serviços Técnicos Avançados</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-normal">
              Dominamos a microeletrônica em todas as principais categorias de hardware de alta performance do varejo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service => {
              const Icon = serviceIcons[service.id] || Cpu;
              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service.slug)}
                  className="bg-slate-900/40 border border-slate-900 hover:border-red-500/20 rounded-2xl p-6 transition-all cursor-pointer group hover:bg-slate-900/60 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center text-red-500 mb-4 group-hover:scale-105 transition-transform">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display font-bold text-white text-base sm:text-lg group-hover:text-red-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-950 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Prazo: {service.estimatedTime}</span>
                    <span className="text-red-500 font-bold flex items-center gap-0.5">Laudo →</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE CASE STUDIES ("ANTES E DEPOIS") */}
      <section className="py-24 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-2">
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full">Casas reais consertados sob microscópio</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">Antes e Depois dos Reparos</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-normal">
              Veja o estado do hardware antes da intervenção microeletrônica e a perfeição estética e prática de bancada na Jetron.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left case menu lists */}
            <div className="lg:col-span-4 space-y-3">
              {REPAIR_CASES.map((rCase, idx) => (
                <div
                  key={rCase.id}
                  onClick={() => {
                    setActiveCaseIdx(idx);
                    setIsBefore(false);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${activeCaseIdx === idx ? 'bg-red-600/10 border-red-500/30' : 'bg-slate-900/20 border-slate-900'}`}
                >
                  <h4 className="font-display font-bold text-slate-200 text-xs sm:text-sm line-clamp-1 group-hover:text-red-500">
                    {rCase.title}
                  </h4>
                  <span className="block text-[10px] font-mono text-slate-500 mt-1 uppercase">{rCase.hardware}</span>
                </div>
              ))}

              <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl text-center space-y-2 mt-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Quer ver mais microscopia?</span>
                <span
                  onClick={() => onNavigate("/laboratorio")}
                  className="text-xs text-red-500 hover:text-red-400 cursor-pointer font-bold inline-flex items-center gap-1"
                >
                  Explorar nosso Laboratório →
                </span>
              </div>
            </div>

            {/* Right slider visualization layout */}
            <div className="lg:col-span-8 bg-slate-900/40 border border-slate-900 rounded-2xl p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-red-500 uppercase font-bold block mb-1">PROJETO DE RECUPERAÇÃO ATIVO: {activeCase.hardware}</span>
                
                <h3 className="font-display font-black text-white text-lg sm:text-xl mb-4 text-left">
                  {activeCase.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-left mb-6">
                  <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono text-red-500 uppercase font-bold block">Sintoma Inicial / Avaria</span>
                    <p className="text-slate-400">{activeCase.symptom}</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono text-green-500 uppercase font-bold block">Solução de Bancada Realizada</span>
                    <p className="text-slate-300">{activeCase.solution}</p>
                  </div>
                </div>

                {/* Highly interactive visual layout with switch triggers */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl h-64 sm:h-80 bg-slate-950 border border-slate-900 flex items-center justify-center">
                  <img
                    src={isBefore ? activeCase.imageUrlBefore : activeCase.imageUrlAfter}
                    alt={activeCase.hardware}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Absolute visual toggle button badge */}
                  <div className="absolute top-4 left-4 z-10 flex gap-1 bg-slate-950/80 border border-white/10 rounded px-1.5 py-1">
                    <button
                      onClick={() => setIsBefore(true)}
                      className={`px-3 py-1 text-[9px] font-mono font-bold rounded uppercase transition-colors ${isBefore ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      Antes (Avaria)
                    </button>
                    <button
                      onClick={() => setIsBefore(false)}
                      className={`px-3 py-1 text-[9px] font-mono font-bold rounded uppercase transition-colors ${!isBefore ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      Depois (Salvo)
                    </button>
                  </div>

                  {/* Micro label indication */}
                  <div className="absolute bottom-4 right-4 bg-slate-950/90 text-[10px] text-slate-300 px-3 py-1.5 rounded border border-white/5 font-mono">
                    {isBefore ? "❌ Curto elétrico e placa inoperante" : "✓ Semicondutores re-soldados perfeitamente"}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-950 text-slate-400 text-xs text-left italic">
                <strong>Laudo de Estabilidade:</strong> {activeCase.notes}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. DIAGNOSTICO IA SEÇÃO BANNER INTRÍNSECO */}
      <section className="py-20 bg-gradient-to-r from-red-950/20 via-slate-950 to-slate-950 border-b border-slate-900 overflow-hidden relative">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-red-600/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[9px] uppercase font-bold px-3 py-1 rounded-full inline-block">
                COPILOTO DIGITAL JETRON
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                Seu Hardware apresenta Falhas? <br />
                Faça o Pré-Diagnóstico com Nossa IA
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Desenvolvemos uma ferramenta de inteligência artificial de bancada baseada nos diagramas esquemáticos e laudos reais da Jetron. Descubra os possíveis periféricos falhos do seu PC Gamer ou MacBook em segundos.
              </p>
            </div>

            <div className="md:col-span-4 text-center md:text-right">
              <span
                onClick={() => onNavigate("/diagnostico-ia")}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-display uppercase font-black text-xs tracking-wider px-8 py-3.5 rounded-xl cursor-pointer shadow-xl hover:scale-105 transition-all text-center"
              >
                Diagnosticar com IA Agora →
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM FEED SECTION INTEGRADO */}
      <InstagramFeed />

      {/* 7. BRANDS WE SERVICE (MARCAS ATENDIDAS) */}
      <section className="py-16 bg-slate-950/20 border-b border-slate-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block mb-8">Marcas de alta performance atendidas em bancada</span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {(() => {
              const brandIcons: Record<string, any> = {
                "Apple": Apple,
                "Asus": Gamepad2,
                "Gigabyte": Flame,
                "MSI": Zap,
                "Acer": Rocket,
                "Dell": Briefcase,
                "Lenovo": Laptop,
                "HP": Printer,
                "Samsung": Smartphone
              };
              return brands.map(brand => {
                const BrandIcon = brandIcons[brand.name];
                return (
                  <div key={brand.name} className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-all duration-200 cursor-default group">
                    {BrandIcon && (
                      <BrandIcon size={18} className="text-red-500/70 group-hover:text-red-500 transition-colors" />
                    )}
                    <span className="font-display font-extrabold tracking-tight text-xs sm:text-sm uppercase">{brand.name}</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-2">
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full">Avaliações honestas no Google Maps</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">O que dizem os clientes da Jetron</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-normal">
              Trabalhamos focados em diagnóstico limpo e satisfação duradoura. Confira depoimentos públicos deixados na oficina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 shadow-lg hover:border-slate-800 transition-all flex flex-col justify-between text-left">
                <div className="space-y-3">
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(test.stars)].map((_, s) => (
                      <Star key={s} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{test.review}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-950 flex items-center justify-between text-[11px] text-slate-400">
                  <strong className="text-white font-display">{test.name}</strong>
                  <span className="font-mono text-slate-500">{test.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. ADVANCING FAQ FOR LOCALSEO */}
      <section className="py-24 bg-slate-950/40 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full">Esclareça suas dúvidas rapidamente</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">Perguntas Frequentes (FAQ)</h2>
          </div>

          <div className="space-y-4">
            {generalFaqs.map((faq, idx) => {
              const isOpened = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/30 border border-slate-900 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpened ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center text-slate-200 hover:text-white font-display font-bold text-xs sm:text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`text-red-500 transition-transform duration-200 ${isOpened ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpened && (
                    <div className="px-6 pb-5 pt-1 border-t border-slate-950 text-slate-400 text-xs leading-relaxed text-left animate-[fadeIn_0.2s_ease-out]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
