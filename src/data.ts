/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, BlogPost, RepairCase, Neighborhood, SurroundingCity } from "./types";

export const SERVICES: Service[] = [
  {
    id: "placa-video",
    slug: "conserto-placa-video-curitiba",
    title: "Conserto de Placa de Vídeo",
    shortDescription: "Reparo avançado para GPUs Nvidia RTX, GTX e AMD Radeon com diagnóstico térmico e osciloscópio.",
    fullDescription: "A Jetron é referência em Curitiba no reparo de placas de vídeo de alta performance. Oferecemos diagnóstico microscópico e eletrônico completo, sanando problemas de alimentação (VRM), curto-circuito em linhas de 12V, ausência de tensões secundárias, oxidação por umidade, substituição de controladores PWM e memórias VRAM corrompidas. Cada placa passa por testes severos de estresse térmico e benchmark (FurMark / 3DMark) durante várias horas para garantir longevidade extrema.",
    features: [
      "Diagnóstico microscópico de trilhas e componentes SMD",
      "Sanamento de curto na linha primária (12V) e secundárias (VCore, VMem, VPEX)",
      "Substituição de chips de memória VRAM (GDDR6 / GDD6X)",
      "Troca de controladores PWM e fases de alimentação (MOSFETs/DrMOS)",
      "Manutenção preventiva premium com troca de Thermal Pads e Pasta Térmica de alto desempenho (Cooler Master / Thermal Grizzly)"
    ],
    pricingRange: "A partir de R$ 250",
    estimatedTime: "2 a 5 dias úteis",
    seoTitle: "Conserto de Placa de Vídeo em Curitiba | Reparo Especializado GPU",
    seoDescription: "Precisa de conserto de placa de vídeo em Curitiba? Somos especialistas em reparo de placas Nvidia RTX e AMD, curto em VRM, mosfets e testes de estresse.",
    iconName: "Cpu",
    faqs: [
      {
        question: "Vocês dão garantia no reparo de placas de vídeo?",
        answer: "Sim, todos os nossos serviços possuem garantia por escrito de 90 dias cobrindo o reparo feito em laboratório."
      },
      {
        question: "Minha placa dá tela preta sob carga (jogos). O que pode ser?",
        answer: "Pode ser instabilidade no VRM (fases de alimentação), desgaste severo da pasta térmica/thermal pads causando thermal throttling, ou degradação do chip principal (necessitando reballing) ou módulos de memória VRAM."
      }
    ]
  },
  {
    id: "reballing",
    slug: "reballing-curitiba",
    title: "Reballing Profissional",
    shortDescription: "Restauração física de soldas BGA utilizando estação infravermelha profissional Jet Common e ligas de chumbo ultra-resistentes.",
    fullDescription: "O desgaste térmico, dilatação física e estresse contínuo causam trincas invisíveis nas soldas BGA abaixo da GPU ou processadores de notebooks/consoles. O reballing consiste em remover o chip BGA por aquecimento ultra-controlado de curva de temperatura, remover a solda antiga livre de chumbo (frágil) e refazer as micro-esferas usando ligas especiais estanho-chumbo que toleram dilatações térmicas severas, re-soldando o chip com precisão micrométrica.",
    features: [
      "Processo executado em Estação de Rework BGA profissional infravermelha automatizada",
      "Microesfera calibrada alloy Sn63/Pb37 para fusão superior",
      "Total controle térmico sem risco de dano térmico (delaminação) ao PCB",
      "Uso exclusivo de insumos originais (Fluxo Amtech / esferas alemãs PMTC)",
      "Indicado para reparar placas de vídeo, MacBooks e consoles com solda fria"
    ],
    pricingRange: "Sob consulta após diagnóstico gratuito",
    estimatedTime: "3 a 7 dias úteis",
    seoTitle: "Reballing em Curitiba | Solda BGA Profissional de GPU e Consoles",
    seoDescription: "Especialistas em Reballing em Curitiba. Recuperação de solda fria BGA de placas de vídeo, MacBooks, PS5, Xbox e notebooks com perfil de temperatura profissional.",
    iconName: "Layers",
    faqs: [
      {
        question: "Qual a diferença entre Reflow e Reballing?",
        answer: "O reflow apenas aquece a placa para que a solda derreta temporariamente, o que dura poucas semanas e danifica a placa. O Reballing substitui 100% da solda velha por novas esferas de alta durabilidade mecânica de liga estanho-chumbo."
      }
    ]
  },
  {
    id: "macbook",
    slug: "conserto-macbook-curitiba",
    title: "Conserto de MacBook",
    shortDescription: "Reparo eletrônico avançado de placa lógica, falhas de carga USB-C (chip CD3215/CD3217) e recuperação pós-líquido.",
    fullDescription: "Não condene a placa lógica do seu MacBook. Na Jetron, atuamos onde a autorizada condena: reparamos falhas eletrônicas no conversor DC-DC Backlight, trocamos transistores de entrada, resolvemos curtos-circuitos causados por derramamento de líquidos mecânicos e desoxidamos placas sob ultrassom. Atendemos MacBook Pro, MacBook Air, iMac e Mac Mini com processador M1, M2, M3 e Intel.",
    features: [
      "Análise de placa de MacBook via esquemáticos digitais (.boardview) e microscópio",
      "Solução de curtos na linha principal de 12V (PPBUS_G3H)",
      "Troca de controladores Thunderbolt USB-C (CD3215 / CD3217 / CD3219)",
      "Substituição de tela retina, baterias originais seladas e teclados rebitados",
      "Recuperação avançada de aparelhos oxidados por infiltração de líquidos"
    ],
    pricingRange: "A partir de R$ 400",
    estimatedTime: "3 a 5 dias úteis",
    seoTitle: "Conserto de MacBook em Curitiba | Reparo Placa Lógica Apple",
    seoDescription: "Conserto de MacBook em Curitiba. Especialistas em Apple, placas com M1/M2/Intel, oxidados, componentes eletrônicos. Economize até 70% em relação à placa nova.",
    iconName: "Laptop",
    faqs: [
      {
        question: "Minha placa lógica de MacBook oxidou por água. Tem conserto?",
        answer: "Sim! Quanto mais rápido você trouxer para o laboratório desenergizado, maiores são as chances de desoxidação química em banheira de ultrassom e substituição dos integrados danificados."
      }
    ]
  },
  {
    id: "notebook",
    slug: "conserto-notebook-curitiba",
    title: "Conserto de Notebook",
    shortDescription: "Reparo de placas-mãe de notebook, conectores Jack de carga, reparo de carcaça e dobradiças coladas a vácuo.",
    fullDescription: "Saneamos travamentos, telas azuis recorrentes, ausência de vídeo e falhas de carga no seu notebook de uso corporativo ou gamer. Trocamos chips Super I/O, gravamos memórias BIOS EEPROM corrompidas e reconstruímos fixação de dobradiças quebradas de telas de notebooks de todas as marcas (Dell, Lenovo, Asus, HP, Acer, Samsung).",
    features: [
      "Gravação avançada com gravador profissional de BIOS SPI e Super I/O",
      "Substituição de portas de conectores DC-Jack de carga e USB-C/USB 3.0",
      "Reconstrução estética e mecânica de carcaças de plástico/ligas de magnésio",
      "Reparo eletrônico de fases de alimentação de processador e memória RAM",
      "Upgrades para SSD NVMe de alta performance e expansão de memória"
    ],
    pricingRange: "A partir de R$ 150",
    estimatedTime: "1 a 3 dias úteis",
    seoTitle: "Conserto de Notebook em Curitiba | Reparo de Placa Mãe e Carcaça",
    seoDescription: "Conserto de notebook em Curitiba. Manutenção rápida, troca de telas, gravação de BIOS, reparo de carcaça, Dell, Lenovo, Asus, Acer e HP. Garantia rápida.",
    iconName: "Monitor",
    faqs: [
      {
        question: "O notebook liga, acende as luzes, mas não dá vídeo. É conserto?",
        answer: "Muitas vezes sim. Pode ser desde memória RAM com mau contato, arquivo de BIOS corrompido, tela avariada, até curto na linha de alimentação integrada da placa-mãe."
      }
    ]
  },
  {
    id: "apple",
    slug: "assistencia-apple-curitiba",
    title: "Assistência Apple Especializada",
    shortDescription: "Suporte especializado para iPhones, iPads e iMacs. Troca de telas, baterias e reparo interno com padrão industrial.",
    fullDescription: "Oferecemos o suporte definitivo para toda a linha de dispositivos móveis e desktops da Apple. Nosso laboratório possui as ferramentas homologadas necessárias para realizar procedimentos como desoxidação, troca de telas de alta resolução, troca de baterias que mantêm a saúde energética do aparelho e reparo em circuitos lógicos integrados integrando insumos do mais alto grau tecnológico.",
    features: [
      "Reparo de placa de iPhone (curtos de placa, Touch IC, Baseband)",
      "Troca de bateria original de iPhone mantendo a veracidade do sistema",
      "Substituição de telas de iPhone, iPad e painéis retroiluminados de iMac",
      "Análise de falha de carregamento no circuito Tristar/Hydra do iPhone",
      "Desoxidação química avançada pós-imersão em poços d'água"
    ],
    pricingRange: "A partir de R$ 200",
    estimatedTime: "1 a 4 dias úteis",
    seoTitle: "Assistência Apple Curitiba | Conserto iPhone, iPad e iMac Especializado",
    seoDescription: "Assistência técnica especializada Apple em Curitiba. Reparos avançados em iPhone, iPad e iMac. Troca de telas, baterias e circuitos lógicos microscópicos.",
    iconName: "Smartphone",
    faqs: [
      {
        question: "A saúde da minha bateria do iPhone caiu. A troca de vocês mostra mensagem de peça desconhecida?",
        answer: "Oferecemos métodos de transplante de chip controlador original (BMS) para manter o sistema integrado sem mensagens de erro e preservando a saúde correta em 100% nas configurações."
      }
    ]
  },
  {
    id: "pc-gamer",
    slug: "montagem-pc-gamer-curitiba",
    title: "Montagem e Upgrade de PC Gamer",
    shortDescription: "Gerenciamento de cabos impecável, otimização de fluxo de ar, montagem profissional e overclock seguro.",
    fullDescription: "A montagem de um computador de alta performance exige cuidado cirúrgico com torque dos parafusos, aplicação correta de pasta térmica, posicionamento estético de coolers, instalação de sistemas de refrigeração líquida (Water Cooler AIO ou customizados) e minucioso gerenciamento de cabos. Projetamos o seu computador visando o máximo desempenho mecânico e acústico, fornecendo estabilidade total.",
    features: [
      "Dimensionamento equilibrado de processador, GPU, memória e fonte de alimentação",
      "Cable management profissional com isolamento elétrico e fixações de nylon",
      "Instalação térmica especializada de Air Coolers e Water Coolers selados",
      "Otimização de BIOS: ativação de perfil XMP/EXPO e controle de curvas das ventoinhas",
      "Estresse, controle térmico de carga e overclocking leve parametrizado"
    ],
    pricingRange: "A partir de R$ 180",
    estimatedTime: "1 a 2 dias úteis",
    seoTitle: "Montagem de PC Gamer em Curitiba | Upgrade e Otimização Hardware",
    seoDescription: "Procura montagem de PC Gamer em Curitiba? Oferecemos montagem limpa, cable management premium, instalação de watercooler e atualizações térmicas.",
    iconName: "Gamepad2",
    faqs: [
      {
        question: "Se eu comprar as peças na internet, vocês montam para mim?",
        answer: "Sim! Você traz as peças fechadas que montamos, organizamos os cabos perfeitamente e fazemos todos os testes de estabilidade na sua frente."
      }
    ]
  }
];

export const REPAIR_CASES: RepairCase[] = [
  {
    id: "case-01",
    title: "Reparo Eletrônico Completo em RTX 3080 Ti ASUS ROG Strix",
    hardware: "ASUS ROG Strix RTX 3080 Ti 12GB",
    symptom: "Placa morta com curto-circuito na linha primária de 12V (fusíveis de entrada abertos).",
    solution: "Substituição cirúrgica do circuito integrado DrMOS queimado (renovação do driver de fase), substituição dos capacitores de tântalo em curto e fusíveis cerâmicos de segurança. Substituição térmica por thermalpads e pasta térmica de alto nível.",
    imageUrlBefore: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600",
    imageUrlAfter: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=600",
    notes: "Curto 100% resolvido. Placa testada no TimeSpy do 3DMark em estresse contínuo por 6 horas com estabilidade térmica e temperatura máxima sob carga estabilizada em excelentes 68°C."
  },
  {
    id: "case-02",
    title: "Reballing do Processador M1 em MacBook Pro Prolapsado",
    hardware: "MacBook Pro M1 13\" (A2338)",
    symptom: "MacBook não inicia, sem sinal de carregamento ou resposta na placa USB-C, tensões de barramento oscilando.",
    solution: "Extração microscópica do chip M1 na estação de retrabalho com laser térmico. Desoxidação do barramento de esferas no PCB, reconstituição com esferas contendo chumbo premium 0.35mm, recolocação física do chip sob microscópio óptico.",
    imageUrlBefore: "https://i.ytimg.com/vi/7xks2iZytO4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD6JEUxPu9GpobNZMq-xu4p6nsRQA",
    imageUrlAfter: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFUSJNsSKfTQhO8c3S3K4B1o1PQILa6RODew&s",
    notes: "Reparo complexo e de altíssima precisão. Placa lógica restabelecida perfeitamente após transplante mecânico sem alteração estrutural no restante dos periféricos."
  },
  {
    id: "case-03",
    title: "Curto Eletrônico Severo no VRM de Console PlayStation 5",
    hardware: "Sony PlayStation 5 (Placa CFI-1014)",
    symptom: "Console dá um bipe curto, acende a luz azul de LED por 1 segundo e desliga abruptamente.",
    solution: "Varredura térmica sob câmera térmica identificando aquecimento instantâneo em filtro de desacoplamento do conversor síncrono. Substituição do conjunto SMD defeituoso e limpeza de oxidações no metal líquido da APU.",
    imageUrlBefore: "https://i.ytimg.com/vi/4IlY2GBUZg4/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGFEgWyhlMA8=&rs=AOn4CLAgJljJfzN8_wKye2oBVIXPz-KKJQ",
    imageUrlAfter: "https://live.staticflickr.com/65535/54456704504_415ab3db1c_k.jpg",
    notes: "Restaurada liga de contato térmico com Metal Líquido original. PS5 operando sob silêncio térmico absoluto com jogos estressores por mais de 5 horas seguidas."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "O Guia Definitivo do Reballing: O que é, quando fazer e por que evitar o Reflow",
    slug: "o-guia-definitivo-do-reballing-curitiba",
    summary: "Entenda detalhadamente a microeletrônica por trás das esferas BGA e saiba como evitar que enganem você com aquecimentos temporários.",
    category: "Análise Técnica",
    readTime: "6 min de leitura",
    date: "12 de Junho, 2026",
    author: "Eng. Técnico Jetron",
    content: "## O que são soldas BGA?\n\nOs chips modernos de placas de vídeo e computadores de alta velocidade (como iMacs e notebooks gamer) utilizam a arquitetura de encapsulamento **BGA (Ball Grid Array)**. Em vez de perninhas ligando o chip de silício na placa-mãe, há centenas de pequenas microesferas de solda dispostas em formato de grade diretamente sob a base do componente.\n\n### O inimigo oculto: Trinca mecânica por estresse térmico\n\nQuando seu computador esquenta sob carga pesada e resfria rapidamente após fechar o jogo ou aplicativo, ocorre uma contração e dilatação de micrômetros na estrutura metálica. Ao longo dos anos, essa movimentação mecânica de materiais causa trincas microscópicas nas esferas de solda, resultando em mau contato elétrico (conhecido no mercado como 'solda fria'). O dispositivo então para de dar vídeo ou exibe artefatos na tela.\n\n### Por que o Reflow é um crime contra o seu bolso?\n\nO chamado 'reflow' é a técnica charlatã de aplicar ar quente ou sopradores industriais de forma genérica sobre o silício temporariamente, para amolecer a solda e fazer contato novamente de forma precária. O reflow não dura mais do que algumas semanas e deforma as camadas do substrato de fibra de vidro da placa lógica, carboniza as trilhas e condena o chip para sempre.\n\n### O caminho correto: Reballing profissional\n\nNo processo de **Reballing** executado na Jetron de Curitiba, nós removemos Fisicamente o chip por completo usando curvas de temperatura precisas in uma estação de rework infravermelha Jet Common. Removemos 100% da liga velha e quebradiça livre de chumbo (Lead-Free), limpamos a placa, aplicamos fluxo Amtech importado e soldamos novas microesferas de liga estanho-chumbo de liga certificada de liga com excelente elasticidade de torção térmica (Alloy Sn63/Pb37). Depois, re-soldamos o chip de volta perfeitamente. O resultado é um reparo definitivo, estável e sob garantia integral.",
    tags: ["Reballing", "Microeletrônica", "Notebook", "Placa de Vídeo"],
    imageUrl: "https://www.globalwellpcba.com/wp-content/uploads/2025/08/BGA-chip-attached-to-a-PCB-with-precise-reflow-areas-visible-1024x632.webp"
  },
  {
    title: "Por que as Placas de Vídeo Queimam? Problemas mais comuns na linha interna de alimentação (VRM)",
    slug: "por-que-placas-de-video-queimam-curitiba",
    summary: "Descubra como oscilações de energia sob fontes de baixa qualidade de Curitiba degradam os MOSFETs do conversor síncrono da GPU.",
    category: "Manutenção Preventiva",
    readTime: "8 min de leitura",
    date: "05 de Junho, 2026",
    author: "Especialista em Placas",
    content: "## A anatomia de uma Placa de Vídeo Queimada\n\nMuitos usuários pensam que a GPU (o chip de silício central) é o que mais estraga, mas na realidade, **mais de 88% dos defeitos nas placas de vídeo ocorrem no sistema interno de alimentação secundário (VRM - Voltage Regulator Module)**.\n\nUm processador gráfico moderno exige correntes gigantescas de energia elétrica em baixíssima tensão (por volta de 1.05V a 1.25V). Para converter os 12V que vêm da fonte do seu PC gamer para essa tensão limpa e estável, o VRM utiliza fases eletrônicas sincronizadas por MOSFETs de silício (ou DrMOS) e indutores de ferrite.\n\n### Causas mais comuns de queima total:\n\n1. **Fontes de Alimentação Incompatíveis ou de Baixa Qualidade:** Se a linha de alimentação não entrega uma corrente com baixo ripple (ruído oscilatório), os capacitores internos sofrem fadiga precoce e transferem todo o calor e flutuação para as DrMOS.\n2. **Ressecamento e Degradação de Thermal Pads:** Com o passar do tempo, as almofadas térmicas de borracha que encostam no sistema de alumínio ressecam e param de transferir calor. Sob estresse, o chip DrMOS esquenta muito além dos limites e sofre um curto interno entre seus pinos Dreno, Source e Gate.\n3. **Curto na Linha de 12V:** Quando um MOSFET entra em curto, ele conecta diretamente a linha externa de 12V ao chip de silício central de 1.1V. Se os fusíveis rápidos de proteção SMD ou a proteção de sobrecorrente (OCP) da fonte falharem, o chip de silício gráfico principal é quebrado sem chances de conserto.\n\n### Como a Jetron realiza o diagnóstico desse setor?\n\nNós isolamos a placa da rede, medimos as impedâncias (resistências elétricas) em relação ao terra de cada barramento secundário com um multímetro de precisão, identificamos curto-circuitos e injetamos corrente com fontes analógicas reguladas, observando os pontos quentes milimétricos através de câmeras de imagem térmica infravermelhas de laboratório. Após isolar a peça falida, fazemos a substituição e higienizamos de forma eletrônica o PCB.",
    tags: ["VRM", "Curto-circuito", "Manutenção Gamer", "RTX", "AMD"],
    imageUrl: "https://i.ytimg.com/vi/A7C29B4fuHI/maxresdefault.jpg"
  },
  {
    title: "O que fazer quando derramar líquidos no MacBook? Passo a passo de emergência sob microscópio",
    slug: "emergencia-liquido-macbook-curitiba",
    summary: "Seu café ou copo de água caiu na carcaça do laptop da Apple? Saiba as ações necessárias nos primeiros segundos que decidem o milagre.",
    category: "Suporte Apple",
    readTime: "5 min de leitura",
    date: "28 de Maio, 2026",
    author: "Laboratório Apple Jetron",
    content: "## O perigo da eletrólise instantânea\n\nA água por si só não queima um circuito. O perigo crucial ocorre devido aos **sais minerais dissolvidos na água** que conduzem eletricidade. Quando um líquido toca uma placa lógica de MacBook que está energizada (mesmo desligado, a bateria de lítio interna envia energia ativa de controle de espera), inicia-se um processo de **eletrólise ácida instantânea de materiais**.\n\nA eletricidade consome o cobre das trilhas microscópicas da placa lógica Apple em pouquíssimos minutos, corroendo pinos de componentes de carga de 20V (como os microchips Thunderbolt CD3215 / CD3217) e levando o curto para barramentos do barramento de dados principal.\n\n### Regras de ouro de emergência de salvamento:\n\n* **NUNCA tente ligar o MacBook:** Esse é o erro mais clássico. Ligar o aparelho para testar injeta mais eletricidade, aumentando a destruição da corrosão elétrica em alta aceleração.\n* **Não use o Truque do Arroz:** O amido do arroz gera detritos e poeira que impregnam nas regiões úmidas do MacBook, agindo de forma alcalina de difícil remoção. O arroz é lento demais e não limpa as regiões por baixo de semicondutores BGA.\n* **Desligue forçadamente e vire de ponta-cabeça:** Pressione o botão liga/desliga por 10 segundos para dar comando de corte de hardware lógico, abra a tampa da tela e apoie o teclado virado para baixo em uma mesa com toalha absorvente. Isso desencoraja gravitationalmente o líquido de migrar para a placa-mãe superior.\n* **Procure suporte eletrônico especialista com urgência:** O MacBook precisa ser desmontado, ter sua bateria desconectada fisicamente no primeiro parafuso de isolamento técnico e passar por **Desoxidação Ultrassônica** em solução química de álcool isopropílico de pureza 99.8% em laboratório técnico.\n\nNa Jetron, possuímos banheiras industriais de alta frequência ultrassônica que vibram as moléculas líquidas desoxidantes por debaixo de todos os microchips encastelados, eliminando minerais de corrosão por completo antes de re-soldarmos trilhas quebradas com micro-solda microscópica.",
    tags: ["MacBook", "Infiltração", "Desoxidação", "Placa Lógica Apple"],
    imageUrl: "https://images.wondershare.com/recoverit/article/macbook-water-damage-repair-5.jpg"
  }
];

export const OFFICIAL_NEIGHBORHOODS: string[] = [
  "Abranches", "Água Verde", "Ahú", "Alto Boqueirão", "Alto da Glória", "Alto da Rua XV", "Atuba", "Augusta",
  "Bacacheri", "Bairro Alto", "Barreirinha", "Batel", "Bigorrilho", "Boa Vista", "Bom Retiro", "Boqueirão",
  "Butiatuvinha", "Cabral", "Cachoeira", "Cajuru", "Campina do Siqueira", "Campo Comprido", "Campo de Santana",
  "Capão Raso", "Capão da Imbuia", "Cascatinha", "Caximba", "Centro", "Centro Cívico", "Cidade Industrial (CIC)",
  "Cristo Rei", "Fanny", "Fazendinha", "Ganchinho", "Guabirotuba", "Guaíra", "Hauer", "Hugo Lange",
  "Jardim Botânico", "Jardim Social", "Jardim das Américas", "Juvevê", "Lamenha Pequena", "Lindóia", "Mercês",
  "Mossunguê", "Novo Mundo", "Orleans", "Parolin", "Pilarzinho", "Pinheirinho", "Portão", "Prado Velho",
  "Rebouças", "Riviera", "Santa Cândida", "Santa Felicidade", "Santa Quitéria", "Santo Inácio", "Seminário",
  "Sítio Cercado", "São Braz", "São Francisco", "São João", "São Lourenço", "São Miguel", "Taboão", "Tarumã",
  "Tatuquara", "Tingui", "Uberaba", "Umbará", "Vila Izabel", "Vista Alegre", "Xaxim"
];

export const UNOFFICIAL_NEIGHBORHOODS: string[] = [
  "Vila Sandra", "CIC Central", "Neoville", "Vitória Régia", "Caiuá", "Sabará", "Vila Verde", "Nossa Senhora da Luz",
  "Barigui (região)", "Conquista", "Vila Pantanal", "Vila Torres", "Vila das Torres", "Vila Parolin", "Vila Hauer",
  "Vila Guaíra", "Vila Oficinas", "Vila Osternack", "Vila São Pedro", "Vila Audi", "Pinheirinho Velho",
  "Portão Velho", "Capão Raso Velho", "Sítio Cercado Velho", "Jardim Gabineto", "Jardim Itatiaia", "Jardim Kosmos",
  "Jardim da Ordem", "Jardim Alvorada"
];

export const SURROUNDING_CITIES: SurroundingCity[] = [
  { name: "São José dos Pinhais", slug: "sao-jose-dos-pinhais", distanceKm: 12 },
  { name: "Pinhais", slug: "pinhais", distanceKm: 8 },
  { name: "Colombo", slug: "colombo", distanceKm: 15 },
  { name: "Araucária", slug: "araucaria", distanceKm: 18 },
  { name: "Almirante Tamandaré", slug: "almirante-tamandare", distanceKm: 14 },
  { name: "Campo Largo", slug: "campo-largo", distanceKm: 26 },
  { name: "Campo Magro", slug: "campo-magro", distanceKm: 22 },
  { name: "Fazenda Rio Grande", slug: "fazenda-rio-grande", distanceKm: 20 },
  { name: "Quatro Barras", slug: "quatro-barras", distanceKm: 24 },
  { name: "Campina Grande do Sul", slug: "campina-grande-do-sul", distanceKm: 28 },
  { name: "Mandirituba", slug: "mandirituba", distanceKm: 38 },
  { name: "Balsa Nova", slug: "balsa-nova", distanceKm: 42 },
  { name: "Rio Branco do Sul", slug: "rio-branco-sol", distanceKm: 32 },
  { name: "Itaperuçu", slug: "itaperucu", distanceKm: 34 },
  { name: "Tijucas do Sul", slug: "tijucas-do-sul", distanceKm: 52 }
];

// Helper to generate slug for neighborhoods
export function getNeighborhoodSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export const ALL_NEIGHBORHOODS: Neighborhood[] = [
  ...OFFICIAL_NEIGHBORHOODS.map(name => ({
    name,
    slug: getNeighborhoodSlug(name),
    isOfficial: true,
    region: name === "Batel" || name === "Centro" || name === "Água Verde" || name === "Bigorrilho" ? "Nobre / Central" : "Curitiba"
  })),
  ...UNOFFICIAL_NEIGHBORHOODS.map(name => ({
    name,
    slug: getNeighborhoodSlug(name),
    isOfficial: false,
    region: "Região Metropolitana / Setores populares"
  }))
];
