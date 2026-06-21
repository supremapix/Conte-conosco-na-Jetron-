/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Calendar, User, Clock, ChevronLeft, BookOpen, Share2 } from "lucide-react";
import { BLOG_POSTS } from "../data";
import { BlogPost } from "../types";
import VideoSection from "./VideoSection";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ["all", "Análise Técnica", "Manutenção Preventiva", "Suporte Apple"];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert("Link de compartilhamento copiado! Agora você pode compartilhar na sua rede social preferida (Twitter, LinkedIn, Pinterest).");
    } else {
      alert(`Copie esta URL para compartilhar: ${shareUrl}`);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-300 font-sans min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {/* List view of posts */}
          {!activePost ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Header */}
              <div className="text-center max-w-xl mx-auto">
                <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-3 inline-block">
                  CENTRAL DE CONHECIMENTO
                </span>
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
                  Blog Técnico Jetron
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  Artigos explicativos escritos diretamente pelos nossos técnicos engenheiros sobre microeletrônica, solda BGA, reparabilidade de placas lógicas e manutenção de alto desempenho.
                </p>
              </div>

              <VideoSection />

              {/* Filters Search and category selecting tab */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/30 border border-slate-900 rounded-2xl p-4">
                {/* Search */}
                <div className="relative w-full sm:max-w-md">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600 pointer-events-none">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Pesquisar por assunto ou tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 outline-none focus:border-red-500/50"
                  />
                </div>

                {/* Categories Tab */}
                <div className="flex flex-wrap gap-2.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold transition-all border ${selectedCategory === cat ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/10' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                    >
                      {cat === "all" ? "Todos" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts Grid layout */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActivePost(post);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-red-500/20 hover:bg-slate-900/60 transition-all flex flex-col justify-between cursor-pointer group shadow-lg"
                    >
                      <div>
                        {post.imageUrl && (
                          <div className="h-48 w-full overflow-hidden relative border-b border-slate-800">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                          </div>
                        )}
                        
                        <div className="p-6">
                          {/* Meta lines */}
                          <div className="flex items-center justify-between gap-y-1 gap-x-2 text-[10px] font-mono text-slate-500 mb-3.5">
                            <span className="text-red-500 leading-normal font-bold uppercase">{post.category}</span>
                            <span className="text-slate-500 leading-normal">{post.readTime}</span>
                          </div>
                          
                          <h3 className="font-display font-black text-white text-base sm:text-lg mb-2.5 leading-tight group-hover:text-red-500 transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                            {post.summary}
                          </p>
                        </div>
                      </div>

                      {/* Footer elements in card */}
                      <div className="p-6 pt-0">
                        <div className="border-t border-slate-950 pt-4 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <User size={10} className="text-red-500" />
                            {post.author}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleShare(post, e)}
                              className="p-1.5 rounded bg-slate-950 border border-slate-800 hover:text-white text-slate-500 hover:border-red-500/50 transition-colors"
                              title="Copiar Link"
                            >
                              <Share2 size={11} />
                            </button>
                            <span className="text-[10px] font-bold text-red-500 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                              Ler Post →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-900 rounded-3xl">
                  <BookOpen className="text-slate-600 mb-3 mx-auto" size={32} />
                  <h4 className="font-display font-bold text-slate-400 text-sm">Nenhum post encontrado</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Não encontramos artigos correspondentes aos seus parâmetros de busca. Modifique as palavras-chave ou confira outra categoria.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            /* Detailed Post View */
            <motion.div
              key="reader-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Back button */}
              <button
                onClick={() => setActivePost(null)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer mb-8"
              >
                <ChevronLeft size={16} />
                Voltar aos artigos
              </button>

              <article className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono text-slate-500 border-b border-slate-950 pb-5">
                  <span className="text-red-500 font-bold uppercase tracking-wider">{activePost.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-red-500" />
                    {activePost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="text-red-500" />
                    {activePost.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User size={11} className="text-red-500" />
                    {activePost.author}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                  {activePost.title}
                </h1>

                {/* Banner Image */}
                {activePost.imageUrl && (
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-lg">
                    <img
                      src={activePost.imageUrl}
                      alt={activePost.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Markdown content parser representation */}
                <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4 font-sans border-b border-slate-950 pb-8">
                  {activePost.content.split("\n\n").map((para, i) => {
                    // Check if subtitle
                    if (para.startsWith("## ")) {
                      return (
                        <h2 key={i} className="font-display font-black text-white text-lg sm:text-xl pt-4 mb-2 tracking-tight">
                          {para.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (para.startsWith("### ")) {
                      return (
                        <h3 key={i} className="font-display font-bold text-slate-200 text-sm sm:text-base pt-3 mb-1 uppercase tracking-wider">
                          {para.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (para.startsWith("* ")) {
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1.5 py-1">
                          {para.split("\n").map((li, j) => (
                            <li key={j} className="text-slate-300">
                              {li.replace("* ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith("1. ")) {
                      return (
                        <ol key={i} className="list-decimal pl-5 space-y-1.5 py-1">
                          {para.split("\n").map((li, j) => (
                            <li key={j} className="text-slate-300">
                              {li.replace(/^\d+\.\s+/, "")}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={i} className="text-slate-300 max-w-none">
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Tags and sharing */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-mono">
                  <div className="flex flex-wrap gap-1.5">
                    {activePost.tags.map(tag => (
                      <span key={tag} className="bg-slate-950 border border-slate-800 text-slate-400 px-2.5 py-1 rounded text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => handleShare(activePost, e)}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors py-1 px-3 border border-slate-800 hover:border-red-500/50 rounded bg-slate-950 cursor-pointer"
                  >
                    <Share2 size={12} className="text-red-500" />
                    Compartilhar Artigo
                  </button>
                </div>

              </article>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
