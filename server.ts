/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { SERVICES, ALL_NEIGHBORHOODS, SURROUNDING_CITIES, BLOG_POSTS, getNeighborhoodSlug } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini on the server side
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY not configured or is placeholder. AI diagnostics will run in demo/offline mode.");
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI:", e);
}

app.use(express.json());

// API route: AI Technical Diagnostician
app.post("/api/diagnose", async (req: Request, res: Response) => {
  const { deviceType, model, symptoms } = req.body;

  if (!deviceType || !symptoms) {
    res.status(400).json({ error: "Parâmetros 'deviceType' e 'symptoms' são obrigatórios." });
    return;
  }

  // Fallback demo database if Gemini is unavailable
  const offlineDiagnoses: Record<string, any> = {
    "placa-video": {
      possibleCauses: [
        "Curto-circuito na linha secundária de energia (VDDCI / VMem).",
        "Fusível fusistor de entrada de 12V rompido no barramento PCIe.",
        "Desgaste físico das esferas BGA de contato por oscilação térmica extrema."
      ],
      recommendation: "Recomendamos interromper o fornecimento de energia ao PC e evitar religar a máquina. O laboratório Jetron possui microscópios calibrados e câmera de imageamento térmico infravermelho de alta resolução para isolar o componente em curto antes que cause danos irreversíveis ao chip gráfico central.",
      severity: "Crítica",
      complexity: "Alta (Exige microsoldagem SMD)",
      priceEstimate: "A partir de R$ 250",
      whatsappMessage: `Olá Jetron! Fiz o diagnóstico IA para minha placa de vídeo ${model || ""} que apresenta o sintoma: "${symptoms}". Gostaria de agendar uma avaliação técnica com vocês.`
    },
    default: {
      possibleCauses: [
        "Falha intermitente na linha de desacoplamento de energia da placa lógica.",
        "Arquivo de BIOS corrompido de hardware ou degradação de transistores de entrada CMOS.",
        "Curto-circuito passivo em periférico integrado (placa Wi-Fi, porta USB-C ou circuito Tristar)."
      ],
      recommendation: "Desconecte o carregador e evite ligar o aparelho. Faça o encaminhamento técnico ao laboratório Jetron para análise detalhada em nossa banheira ultrasônica de alta frequência.",
      severity: "Média a Alta",
      complexity: "Média",
      priceEstimate: "Sob avaliação gratuita",
      whatsappMessage: `Olá Jetron! Fiz o diagnóstico IA para meu aparelho ${model || deviceType} que apresenta o seguinte sintoma: "${symptoms}". Gostaria de receber uma estimativa.`
    }
  };

  const currentOffline = offlineDiagnoses[deviceType] || offlineDiagnoses.default;

  if (!ai) {
    res.json({
      ...currentOffline,
      note: "Modo offline ativo: API Key do Gemini não detectada. Este é um pré-diagnóstico com base em casos reais gravados da Jetron."
    });
    return;
  }

  try {
    const prompt = `Você é o Engenheiro Sênior de Microeletrônica do laboratório JETRON de Curitiba.
Analise esses dados de diagnóstico de hardware relatados pelo cliente:
- Tipo de dispositivo: ${deviceType}
- Modelo: ${model || "Não informado"}
- Sintomas relatados: ${symptoms}

Com base no seu vasto conhecimento prático de reparo de placas de vídeo (RTX, Radeon), MacBooks (M1, M2, chips CD3215/CD3217), notebooks corporativos e consoles (PS5, Xbox):
Diga quais são as 3 causas prováveis eletrônicas ou físicas em formato de lista (ex: VRM em curto, solda fria BGA, oxidação de trilhas).
Diga qual a recomendação técnica imediata de salvamento.
Diga qual a estimativa de severidade (Baixa, Média, Crítica).
Diga o nível de complexidade do reparo (Baixa, Média, Alta, Altíssima).
Diga uma estimativa de preço aproximada (ex: "A partir de R$ 250" ou "Sob consulta/avaliação gratuita").

Responda estritamente em formato JSON válido com as seguintes chaves textuais exatas em português:
{
  "possibleCauses": ["causa 1", "causa 2", "causa 3"],
  "recommendation": "sua recomendação profissional de forma humanizada e técnica",
  "severity": "seu nível de severidade",
  "complexity": "seu nível de complexidade",
  "priceEstimate": "sua estimativa de preço"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, // Low temperature for high precision/tech focus
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    const whatsappMsg = `Olá Jetron! Fiz o diagnóstico IA no seu site para meu dispositivo (${deviceType} - ${model || "Indefinido"}). Sintoma: "${symptoms}". Causas prováveis sugeridas: ${parsedData.possibleCauses?.join(", ") || ""}. Gostaria de agendar o reparo de laboratório!`;

    res.json({
      possibleCauses: parsedData.possibleCauses || currentOffline.possibleCauses,
      recommendation: parsedData.recommendation || currentOffline.recommendation,
      severity: parsedData.severity || currentOffline.severity,
      complexity: parsedData.complexity || currentOffline.complexity,
      priceEstimate: parsedData.priceEstimate || currentOffline.priceEstimate,
      whatsappMessage: whatsappMsg
    });
  } catch (error) {
    console.error("Gemini API Error, falling back to simulated high-fidelity diagnosis:", error);
    res.json({
      ...currentOffline,
      note: "Retorno de contingência: diagnóstico estruturado com base em dados técnicos padronizados."
    });
  }
});

// Dynamic Sitemap Endpoint
app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");

  const baseUrl = process.env.APP_URL || "https://jetron.com.br";
  const today = new Date().toISOString().split("T")[0];

  const staticRoutes = [
    "",
    "contato",
    "laboratorio",
    "diagnostico-ia",
    "blog"
  ];

  const serviceSlugs = SERVICES.map(s => s.slug);
  const blogSlugs = BLOG_POSTS.map(b => `blog/${b.slug}`);
  const neighborhoodSlugs = ALL_NEIGHBORHOODS.map(n => `bairro/${n.slug}`);
  const citySlugs = SURROUNDING_CITIES.map(c => `cidade/${c.slug}`);

  const allUrls = [
    ...staticRoutes,
    ...serviceSlugs,
    ...blogSlugs,
    ...neighborhoodSlugs,
    ...citySlugs
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  allUrls.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/${route}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route === "" ? "daily" : "weekly"}</changefreq>\n`;
    xml += `    <priority>${route === "" ? "1.0" : route.startsWith("bairro/") ? "0.6" : "0.8"}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  res.send(xml);
});

// Helpers to get unique stable geolocations for each Curitiba neighborhood and metropolitan cities
function getCustomGeoForNeighborhood(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const latOffset = ((Math.abs(hash) % 200) - 100) / 12000; 
  const lngOffset = ((Math.abs(hash >> 3) % 200) - 100) / 12000;
  return {
    latitude: -25.4496222 + latOffset,
    longitude: -49.2520625 + lngOffset
  };
}

function getCustomGeoForCity(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const latOffset = ((Math.abs(hash) % 200) - 100) / 4000; 
  const lngOffset = ((Math.abs(hash >> 3) % 200) - 100) / 4000;
  return {
    latitude: -25.4496222 + latOffset,
    longitude: -49.2520625 + lngOffset
  };
}

// Helper for SEO pre-rendering metadata injection
function getPageSEO(url: string) {
  const normUrl = url.replace(/\/$/, "");

  // Default Fallback
  let title = "Jetron Curitiba | Reparo de Placa de Vídeo, MacBook e Reballing";
  let description = "Assistência técnica de alto nível em Curitiba. Especialistas em eletrônica de alta precisão, reballing de placas de vídeo, conserto de MacBooks, notebooks e PlayStation/Xbox.";
  let ogImage = "https://img.jetron.com.br/jetorn-rebaling-pr.webp"; // Premium slider sharing thumbnail
  let type = "website";

  // Match Services
  const matchingService = SERVICES.find(s => normUrl.endsWith(s.slug));
  if (matchingService) {
    return {
      title: matchingService.seoTitle,
      description: matchingService.seoDescription,
      ogImage,
      type: "article",
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": matchingService.title,
        "description": matchingService.fullDescription,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Jetron Reballing & Tecnologia",
          "telephone": "+55-41-3018-0964",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua Imaculada Conceição, 764",
            "addressLocality": "Curitiba",
            "addressRegion": "PR",
            "postalCode": "80215-901",
            "addressCountry": "BR"
          }
        },
        "offers": {
          "@type": "Offer",
          "price": matchingService.pricingRange.replace(/\D/g, "") || "250",
          "priceCurrency": "BRL"
        }
      }
    };
  }

  // Match Blog Articles
  if (normUrl.includes("/blog/")) {
    const slug = normUrl.split("/blog/")[1];
    const matchingPost = BLOG_POSTS.find(b => b.slug === slug);
    if (matchingPost) {
      return {
        title: `${matchingPost.title} | Blog Técnico Jetron`,
        description: matchingPost.summary,
        ogImage,
        type: "article",
        schema: {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": matchingPost.title,
          "description": matchingPost.summary,
          "datePublished": "2026-06-12",
          "author": {
            "@type": "Person",
            "name": matchingPost.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Jetron",
            "logo": {
              "@type": "ImageObject",
              "url": "https://img.supremamidia.com/suprema-img.png"
            }
          }
        }
      };
    }
  }

  // Match Neighborhood Pages (/bairro/:slug)
  if (normUrl.includes("/bairro/")) {
    const slug = normUrl.split("/bairro/")[1];
    const matchingN = ALL_NEIGHBORHOODS.find(n => n.slug === slug);
    if (matchingN) {
      const nName = matchingN.name;
      const bTitle = `Assistência Técnica e Conserto de Placa de Vídeo no ${nName}, Curitiba | Jetron`;
      const bDesc = `Precisa de conserto de placas de vídeo, MacBook, reballing ou notebooks próximo ao bairro ${nName} em Curitiba? Diagnosticamos com agilidade e busca opcional.`;
      const geoCoords = getCustomGeoForNeighborhood(nName);
      return {
        title: bTitle,
        description: bDesc,
        ogImage,
        type: "place",
        schema: {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `Jetron - Atendimento no Bairro ${nName}, Curitiba`,
          "description": bDesc,
          "telephone": "+55-41-3018-0964",
          "image": ogImage,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua Imaculada Conceição, 764 (Atendimento no Bairro " + nName + ")",
            "addressLocality": "Curitiba",
            "addressRegion": "PR",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": geoCoords.latitude,
            "longitude": geoCoords.longitude
          }
        }
      };
    }
  }

  // Match Cities (/cidade/:slug)
  if (normUrl.includes("/cidade/")) {
    const slug = normUrl.split("/cidade/")[1];
    const matchingC = SURROUNDING_CITIES.find(c => c.slug === slug);
    if (matchingC) {
      const cName = matchingC.name;
      const cTitle = `Conserto de Placa de Vídeo e Notebook em ${cName} - PR | Jetron Reballing`;
      const cDesc = `Oferecemos retirada rápida de equipamentos de informática em ${cName} para toda a nossa gama de serviços técnicos avançados de BGA, reballing, MacBook e GPUs.`;
      const geoCoords = getCustomGeoForCity(cName);
      return {
        title: cTitle,
        description: cDesc,
        ogImage,
        type: "place",
        schema: {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `Jetron - Assistência Técnica para ${cName}`,
          "description": cDesc,
          "telephone": "+55-41-3018-0964",
          "image": ogImage,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": cName,
            "addressRegion": "PR",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": geoCoords.latitude,
            "longitude": geoCoords.longitude
          }
        }
      };
    }
  }

  // Static Special Routes
  if (normUrl.endsWith("/laboratorio")) {
    return {
      title: "Laboratório Jetron | Infraestrutura e Estações de Microsolda Avançada",
      description: "Conheça nossa estação de rework infravermelha Jet Common, osciloscópios, microscópios trinoculares e ferramentas exclusivas de última geração para microeletrônica em Curitiba.",
      ogImage,
      type: "website"
    };
  }

  if (normUrl.endsWith("/diagnostico-ia")) {
    return {
      title: "Diagnóstico IA Jetron | Análise Eletrônica de Hardware Inteligente",
      description: "Descreva seus sintomas de hardware - placa de vídeo, MacBook, notebook ou console e obtenha na hora possíveis causas eletrônicas estruturadas com IA Generativa da Jetron.",
      ogImage,
      type: "website"
    };
  }

  if (normUrl.endsWith("/blog")) {
    return {
      title: "Blog Técnico de Eletrônica e Software | Jetron Curitiba",
      description: "Dicas de segurança, explicações técnicas fáceis de entender de por que placas estragam, como cuidar de laptops e novidades industriais de reballing.",
      ogImage,
      type: "website"
    };
  }

  if (normUrl.endsWith("/contato")) {
    return {
      title: "Contato Jetron Curitiba | Como Chegar ao Laboratório",
      description: "Venha nos visitar! Rua Imaculada Conceição, 764, Prado Velho (anexa à PUCPR). Ligue para (41) 3018-0964 ou envie mensagem no WhatsApp (41) 99938-3882.",
      ogImage,
      type: "website"
    };
  }

  // Default Home
  return {
    title,
    description,
    ogImage,
    type,
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://jetron.com.br/#localbusiness",
      "name": "Jetron Reballing & Tecnologia",
      "image": "https://img.supremamidia.com/suprema-img.png",
      "telephone": "+55-41-3018-0964",
      "email": "jetron.reballing@gmail.com",
      "url": "https://jetron.com.br",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Imaculada Conceição, 764",
        "addressLocality": "Curitiba",
        "addressRegion": "PR",
        "postalCode": "80215-901",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -25.4496222,
        "longitude": -49.2520625
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  };
}

function getPreRenderedBodyHTML(url: string): string {
  const normUrl = url.replace(/\/$/, "");
  const seo = getPageSEO(url);
  
  // Default structure
  let title = seo.title;
  let description = seo.description;
  let mainContent = `<p>${description}</p>`;
  
  if (normUrl === "" || normUrl === "/" || normUrl === "/index.html") {
    mainContent = `
      <h1>Jetron Curitiba | Assistência Técnica Especializada de Placas</h1>
      <p>Localizado em Curitiba, Prado Velho, anexo ao DCE da PUCPR.</p>
      <h2>Serviços de Alta Precisão Realizados em Nosso Laboratório</h2>
      <ul>
        <li><strong>Conserto de Placa de Vídeo:</strong> Recuperação de trilhas microscópicas, curto-circuito em VRM e troca de VRAM.</li>
        <li><strong>Reballing BGA Profissional:</strong> Substituição total da solda antiga livre de chumbo por ligas Sn63/Pb37 de altíssima durabilidade.</li>
        <li><strong>Conserto de MacBook:</strong> Especialistas em desoxidação por ultrassom de placas lógicas M1, M2 de MacBook Air e Pro.</li>
        <li><strong>Conserto de Notebook:</strong> Upgrades de alta performance e regravação SPI de arquivos de BIOS corrompidos.</li>
      </ul>
    `;
  } else if (normUrl.endsWith("/laboratorio")) {
    mainContent = `
      <h1>Laboratório de Precisão de Hardware Jetron Curitiba</h1>
      <p>Nosso laboratório conta com estações profissionais de infusão infravermelha Jet Common, microscópios trinoculares de zoom micrométrico contínuo, osciloscópios e imageamento térmico.</p>
      <h2>Ferramentas de Nível Industrial</h2>
      <ul>
        <li>Estação automatizada BGA Jet Common</li>
        <li>Câmeras térmicas de varredura ultrarrápida de curto-circuito</li>
        <li>Osciloscópio digital de 100MHz Dual Channel para portas lógicas</li>
      </ul>
    `;
  } else if (normUrl.endsWith("/diagnostico-ia")) {
    mainContent = `
      <h1>Copiloto de Diagnóstico IA de Bancada</h1>
      <p>Nosso assistente inteligente analisa sintomas eletrônicos de placas de vídeo, MacBooks, notebooks e consoles, fornecendo as causas mais prováveis e a severidade em segundos.</p>
    `;
  } else if (normUrl.endsWith("/blog")) {
    mainContent = `
      <h1>Blog de Microeletrônica Industrial Jetron</h1>
      <p>Dicas técnicas explicadas por especialistas sobre manutenção preventiva premium e engenharia reversa de hardware.</p>
    `;
  } else if (normUrl.endsWith("/quem-somos")) {
    mainContent = `
      <h1>Quem Somos | Engenharia de Hardware Jetron</h1>
      <p>Somos técnicos apaixonados que recuperam hardware condenado por assistências autorizadas e terceiros em Curitiba.</p>
    `;
  } else if (normUrl.endsWith("/contato")) {
    mainContent = `
      <h1>Contato | Venha ao Nosso Laboratório</h1>
      <p>Fale conosco ou faça uma visita em Prado Velho, Rua Imaculada Conceição, 764, Curitiba - PR. Telefone fixo (41) 3018-0964, WhatsApp (41) 99938-3882.</p>
    `;
  } else {
    // Dynamic matching
    const matchingService = SERVICES.find(s => normUrl.endsWith(s.slug));
    if (matchingService) {
      mainContent = `
        <h1>Serviço: ${matchingService.title}</h1>
        <p>${matchingService.fullDescription}</p>
        <h2>Destaques do Serviço em Curitiba</h2>
        <ul>
          ${matchingService.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
        <p><strong>Preço estimado:</strong> ${matchingService.pricingRange}</p>
      `;
    }
    
    // Neighborhood matching
    if (normUrl.includes("/bairro/")) {
      const slug = normUrl.split("/bairro/")[1];
      const matchingN = ALL_NEIGHBORHOODS.find(n => n.slug === slug);
      if (matchingN) {
        mainContent = `
          <h1>Assistência Técnica em Curitiba - Bairro ${matchingN.name}</h1>
          <p>Oferecemos atendimento expresso de manutenção cirúrgica de MacBooks, notebooks e placas de vídeo na região do ${matchingN.name}.</p>
          <p>Retiramos e entregamos no conforto da sua residência com total segurança operacional no bairro ${matchingN.name}.</p>
        `;
      }
    }
    
    // City matching
    if (normUrl.includes("/cidade/")) {
      const slug = normUrl.split("/cidade/")[1];
      const matchingC = SURROUNDING_CITIES.find(c => c.slug === slug);
      if (matchingC) {
        mainContent = `
          <h1>Conserto e Manutenção de Hardware para ${matchingC.name} - PR</h1>
          <p>Moradores de ${matchingC.name} contam com serviço rápido de frete exclusivo para agilizar o reparo de equipamentos de informática avançados da Apple, notebook gamer e reballing.</p>
        `;
      }
    }
  }

  return `
    <div style="background:#020617; color:#cbd5e1; font-family:sans-serif; padding:40px; min-height:100vh;">
      <div style="max-w-4xl mx-auto; background:#0f172a; border: 1px solid #1e293b; padding: 30px; border-radius:12px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);">
        <header style="margin-bottom:20px; border-bottom:1px solid #1e293b; padding-bottom:20px;">
          <span style="color:#ef4444; font-weight:bold; letter-spacing:1px; outline:none; text-transform:uppercase; font-size:12px;">Pre-Rendered for Crawlers (Google/Ctrl+U)</span>
        </header>
        ${mainContent}
        <footer style="margin-top:40px; border-top:1px solid #1e293b; padding-top:20px; font-size:11px; color:#64748b;">
          <p>Este conteúdo estruturado foi otimizado para motores de busca (SEO) pelo pre-renderizador estático do Jetron Server.</p>
          <p>Jetron Reballing & Tecnologia | Telefone: (41) 3018-0964 | WhatsApp: (41) 99938-3882</p>
        </footer>
      </div>
    </div>
  `;
}

// Intercept routing to inject custom meta tags on the fly (Pre-rendering SSR proxy)
async function handleSEOMiddleware(req: Request, res: Response, next: NextFunction) {
  const urlPath = req.path;

  // Let API requests and public asset files bypass this
  if (urlPath.startsWith("/api") || urlPath.includes(".") || urlPath.startsWith("/@")) {
    return next();
  }

  const isProduction = process.env.NODE_ENV === "production";
  const indexDocPath = isProduction
    ? path.join(process.cwd(), "dist", "index.html")
    : path.resolve(process.cwd(), "index.html");

  if (!fs.existsSync(indexDocPath)) {
    return next();
  }

  try {
    let htmlContent = fs.readFileSync(indexDocPath, "utf-8");
    const seo = getPageSEO(urlPath);

    // Replace the placeholders dynamically for social sharing metadata and crawlers (Ctrl+U view source proof)
    const injectedMeta = `
  <title>${seo.title}</title>
  <meta name="description" content="${seo.description}" />
  <link rel="canonical" href="${process.env.APP_URL || 'https://jetron.com.br'}${urlPath}" />
  
  <!-- Favicons for Google, Apple and major platforms -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/favicon.svg" />
  <link rel="manifest" href="/site.webmanifest" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${seo.type}" />
  <meta property="og:title" content="${seo.title}" />
  <meta property="og:description" content="${seo.description}" />
  <meta property="og:image" content="${seo.ogImage}" />
  <meta property="og:url" content="${process.env.APP_URL || 'https://jetron.com.br'}${urlPath}" />
  
  <!-- Twitter Cards -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="${seo.title}" />
  <meta property="twitter:description" content="${seo.description}" />
  <meta property="twitter:image" content="${seo.ogImage}" />
  
  <!-- Pinterest & LinkedIn -->
  <meta name="pinterest-rich-pin" content="true" />
  
  <!-- Structured Semantic Data -->
  ${seo.schema ? `<script type="application/ld+json">${JSON.stringify(seo.schema)}</script>` : ""}
    `;

    // Remove simple title tag from index.html if present, and inject custom headers
    htmlContent = htmlContent.replace(/<title>.*?<\/title>/gi, "");
    htmlContent = htmlContent.replace("</head>", `${injectedMeta}\n</head>`);

    // Inject custom pre-rendered dynamic semantic HTML into the #root div so that Ctrl+U is fully custom-readable!
    htmlContent = htmlContent.replace('<div id="root"></div>', `<div id="root">${getPreRenderedBodyHTML(urlPath)}</div>`);

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(htmlContent);
  } catch (err) {
    console.error("SEO Injector error:", err);
    next();
  }
}

// Register dynamic interceptor before static routing
app.use(handleSEOMiddleware);

// Vite middleware for real-time development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jetron Full stack server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
