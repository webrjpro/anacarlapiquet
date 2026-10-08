// =========================================================================
// DATA REPOSITORY - AGÊNCIA CÓDICE: INVESTIGAÇÃO & INTERPRETAÇÃO DE TEXTO
// Conteúdo Pedagógico Progressivo: Do Fundamental ao Avançado
// =========================================================================

const RANKS = [
  { level: 1, name: "Novata da Agência", minXp: 0, maxXp: 350, icon: "🔍", badge: "Cadete Investigadora" },
  { level: 2, name: "Investigadora de Pistas", minXp: 351, maxXp: 850, icon: "🕵️‍♀️", badge: "Caçadora de Evidências" },
  { level: 3, name: "Perita em Entrelinhas", minXp: 851, maxXp: 1600, icon: "📖", badge: "Leitora Invisível" },
  { level: 4, name: "Inspetora de Casos Ocultos", minXp: 1601, maxXp: 2600, icon: "⚡", badge: "Filtro da Verdade" },
  { level: 5, name: "Estrategista Textual de Elite", minXp: 2601, maxXp: 3900, icon: "🧠", badge: "Mestre da Coesão" },
  { level: 6, name: "Decifradora Suprema do Códice", minXp: 3901, maxXp: 99999, icon: "👑", badge: "Lenda das Letras" }
];

const AVATARS = [
  { id: "agent_cyber", name: "Agente Neon", tag: "Ciber-Investigadora", svg: `<svg viewBox="0 0 100 100" class="avatar-svg"><circle cx="50" cy="50" r="46" fill="#1e1e38" stroke="#00f2fe" stroke-width="4"/><circle cx="50" cy="40" r="20" fill="#ff76ac"/><circle cx="43" cy="38" r="3" fill="#1e1e38"/><circle cx="57" cy="38" r="3" fill="#1e1e38"/><path d="M 44 47 Q 50 52 56 47" stroke="#1e1e38" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M 28 32 C 34 16 66 16 72 32 C 72 32 64 24 50 24 C 36 24 28 32 28 32 Z" fill="#4facfe"/><path d="M 36 34 L 64 34 L 60 40 L 40 40 Z" fill="#00f2fe" opacity="0.8"/><path d="M 22 84 C 26 66 74 66 78 84 Z" fill="#4facfe"/><circle cx="50" cy="74" r="5" fill="#00f2fe"/></svg>` },
  { id: "agent_classic", name: "Lupa Dourada", tag: "Detetive Clássica", svg: `<svg viewBox="0 0 100 100" class="avatar-svg"><circle cx="50" cy="50" r="46" fill="#2d1e2f" stroke="#f6d365" stroke-width="4"/><path d="M 30 36 C 30 18 70 18 70 36 C 76 36 78 40 70 42 C 64 43 36 43 30 42 C 22 40 24 36 30 36 Z" fill="#8c6239"/><circle cx="50" cy="46" r="18" fill="#ffd1a4"/><circle cx="44" cy="45" r="3" fill="#2d1e2f"/><circle cx="56" cy="45" r="3" fill="#2d1e2f"/><path d="M 46 53 Q 50 57 54 53" stroke="#2d1e2f" stroke-width="2" fill="none"/><path d="M 24 86 C 28 68 72 68 76 86 Z" fill="#603813"/><polygon points="47,68 53,68 51,76 49,76" fill="#f6d365"/></svg>` },
  { id: "agent_star", name: "Astral Sombra", tag: "Decifradora Cósmica", svg: `<svg viewBox="0 0 100 100" class="avatar-svg"><circle cx="50" cy="50" r="46" fill="#0b0f24" stroke="#c471ed" stroke-width="4"/><path d="M 26 84 C 30 65 70 65 74 84 Z" fill="#2a1b4e"/><circle cx="50" cy="42" r="19" fill="#fce4ec"/><path d="M 28 38 C 30 18 70 18 72 38 C 66 28 34 28 28 38 Z" fill="#7f00ff"/><circle cx="43" cy="42" r="3" fill="#7f00ff"/><circle cx="57" cy="42" r="3" fill="#7f00ff"/><path d="M 45 49 Q 50 53 55 49" stroke="#7f00ff" stroke-width="2" fill="none"/><polygon points="50,14 53,22 61,22 55,27 57,35 50,30 43,35 45,27 39,22 47,22" fill="#ffd700"/></svg>` },
  { id: "agent_fox", name: "Raposa Sagaz", tag: "Estrategista Oculta", svg: `<svg viewBox="0 0 100 100" class="avatar-svg"><circle cx="50" cy="50" r="46" fill="#1c2833" stroke="#ff7675" stroke-width="4"/><polygon points="32,24 44,40 28,42" fill="#e17055"/><polygon points="68,24 56,40 72,42" fill="#e17055"/><polygon points="36,28 42,38 32,39" fill="#ffeaa7"/><polygon points="64,28 58,38 68,39" fill="#ffeaa7"/><circle cx="50" cy="48" r="22" fill="#fab1a0"/><ellipse cx="42" cy="47" rx="3.5" ry="4.5" fill="#2d3436"/><ellipse cx="58" cy="47" rx="3.5" ry="4.5" fill="#2d3436"/><polygon points="47,54 53,54 50,58" fill="#d63031"/><path d="M 24 86 C 28 68 72 68 76 86 Z" fill="#2d3436"/><path d="M 45 70 L 55 70 L 50 78 Z" fill="#ff7675"/></svg>` }
];

const BADGES = [
  { id: "first_case", name: "Primeira Pista", desc: "Completou seu primeiro caso na Agência.", icon: "🗝️", unlocked: false },
  { id: "iron_core", name: "Núcleo de Ferro", desc: "Descobriu a ideia central de 3 textos seguidos.", icon: "🎯", unlocked: false },
  { id: "xray_vision", name: "Visão de Raio-X", desc: "Decifrou o que estava nas entrelinhas sem cair em armadilhas.", icon: "👁️", unlocked: false },
  { id: "lie_detector", name: "Detector de Falácias", desc: "Diferenciou fatos de opiniões com 100% de precisão.", icon: "⚖️", unlocked: false },
  { id: "irony_master", name: "Radar de Ironia", desc: "Desmascarou mensagens sarcásticas e figuras de linguagem.", icon: "🎭", unlocked: false },
  { id: "bridge_builder", name: "Mestra das Conjunções", desc: "Dominou o efeito dos conectivos que viram o rumo do texto.", icon: "🌉", unlocked: false },
  { id: "highlighter_pro", name: "Marcadora Perita", desc: "Usou o Iluminador de Evidências em pelo menos 3 casos.", icon: "🖍️", unlocked: false },
  { id: "dojo_streak", name: "Mente Relâmpago", desc: "Atingiu uma sequência de 5 acertos seguidos no Dojô de Treino.", icon: "⚡", unlocked: false },
  { id: "boss_slayer", name: "Aniquiladora de Enigmas", desc: "Derrotou o primeiro Grande Chefe de Módulo.", icon: "🏆", unlocked: false },
  { id: "legendary_reader", name: "Decifradora Suprema", desc: "Desvendou o Arquivo Ômega e completou a formação da Agência.", icon: "👑", unlocked: false }
];

// AS 6 GRANDES OPERAÇÕES DE INVESTIGAÇÃO
const OPERATIONS = [
  // -------------------------------------------------------------
  // OPERAÇÃO 1: O NÚCLEO DO MISTÉRIO (Ideia Central & Descarte de Distratores)
  // -------------------------------------------------------------
  {
    id: "op1",
    number: 1,
    title: "O Núcleo do Mistério",
    subtitle: "Separando a Espinha Dorsal do Ruído Secundário",
    description: "Muitos leitores se perdem porque prestam atenção em um detalhe chamativo e esquecem a verdadeira mensagem do autor. Nesta operação, você aprenderá a caçar a Ideia Central como uma detetive de elite.",
    themeColor: "#00f2fe",
    cases: [
      {
        id: "case_1_1",
        title: "Caso 101: O Testamento da Mansão Blackwood",
        category: "Ideia Central vs. Detalhes Secundários",
        difficulty: "Iniciante",
        xp: 120,
        textIntro: "O excêntrico milionário Arthur Blackwood deixou apenas um documento lacrado antes de desaparecer. Todos os herdeiros brigam por quadros raros e relógios de ouro citados no texto, mas a Agência precisa saber o que Arthur REALMENTE quis comunicar.",
        text: `Durante quarenta anos, acumulei nesta casa relógios de ouro trazidos de Viena, tapeçarias orientais e quadros de pintores que o mundo esqueceu. Meus parentes olham para essas paredes com olhos brilhantes, avaliando o preço de cada escultura de mármore e calculando o peso da prataria sobre a mesa de mogno.

Contudo, nenhum deles jamais reparou que, no inverno passado, o vento que entrava pelas frestas deste casarão era tão gelado quanto a solidão que me cercava. As joias nunca conversaram comigo na madrugada, e os relógios apenas contavam o tempo de uma vida desperdiçada em guardar coisas que não respiram.

Por isso, declaro que nenhum centavo ou objeto será entregue a quem apenas ama o reflexo do ouro. Toda a fortuna será destinada à construção de uma biblioteca pública onde crianças que nada têm possam aprender a sonhar — pois o verdadeiro valor de um homem não é o que ele tranca no cofre, mas o que ele liberta no mundo.`,
        clues: [
          "Observe para onde o autor direciona a decisão final: ele fala das riquezas apenas para mostrar o quanto elas foram inúteis.",
          "Cuidado com a armadilha de achar que o texto é sobre 'como os relógios de ouro foram comprados' — isso é só um enfeite secundário!"
        ],
        questions: [
          {
            id: "q_1_1_1",
            question: "Qual é a IDEIA CENTRAL transmitida pelo autor no testamento?",
            hint: "Pergunte-se: qual é a mensagem que resume a decisão de Arthur do começo ao fim?",
            options: [
              {
                id: "A",
                text: "Descrever detalhadamente a beleza e o alto valor financeiro dos relógios e das tapeçarias da mansão.",
                isCorrect: false,
                feedback: "⚠️ ARMADILHA DE DETALHE! Ele cita esses objetos, mas apenas para compará-los com a solidão. O texto não existe para fazer um catálogo dos móveis."
              },
              {
                id: "B",
                text: "Defender que bens materiais não trazem afeto nem sentido à vida, decidindo doar sua fortuna para transformar vidas pela educação.",
                isCorrect: true,
                feedback: "🎯 EXCELENTE DEDUÇÃO! Você encontrou a espinha dorsal: Arthur contrasta o apego material dos parentes com a constatação de que 'coisas não respiram', tomando a decisão de doar os bens para criar uma biblioteca."
              },
              {
                id: "C",
                text: "Reclamar que a mansão é muito fria no inverno e exigir reformas urgentes nas janelas de mogno.",
                isCorrect: false,
                feedback: "⚠️ INTERPRETAÇÃO LITERAL EXCESSIVA! O vento frio foi usado como uma metáfora poética para sua 'solidão', e não como um pedido de conserto predial."
              },
              {
                id: "D",
                text: "Declarar guerra judicial contra os parentes por terem roubado suas esculturas de mármore.",
                isCorrect: false,
                feedback: "⚠️ EXTRAPOLAÇÃO! O texto nunca disse que as esculturas foram roubadas; ele apenas disse que os parentes cobiçavam seus bens."
              }
            ]
          },
          {
            id: "q_1_1_2",
            question: "No segundo parágrafo, a expressão 'guardar coisas que não respiram' foi usada com o objetivo de:",
            hint: "O que significa algo que 'respira'? Pessoas, sentimentos, vida!",
            options: [
              {
                id: "A",
                text: "Criticar o costume de colecionar animais empalhados na sala de estar.",
                isCorrect: false,
                feedback: "⚠️ ERRO DE COMPREENSÃO: O texto não fala sobre animais empalhados. É um sentido figurado sobre objetos inanimados."
              },
              {
                id: "B",
                text: "Mostrar que ele sofria de asma por causa da poeira dos relógios antigos.",
                isCorrect: false,
                feedback: "⚠️ INTERPRETAÇÃO FANTASIOSA: Em momento algum há menção a problemas respiratórios médicos."
              },
              {
                id: "C",
                text: "Evidenciar que objetos materiais, por mais valiosos que sejam, são vazios de vida e incapacitados de oferecer companhia humana.",
                isCorrect: true,
                feedback: "🎯 TIRO CERTEIRO! Essa oposição poética serve para confrontar a ilusão de que bens materiais substituem relacionamentos verdadeiros."
              },
              {
                id: "D",
                text: "Explicar a técnica científica usada para conservar as tapeçarias sem oxigênio.",
                isCorrect: false,
                feedback: "⚠️ ARMADILHA TÉCNICA: Trata-se de uma reflexão emocional, não de um manual de conservação de museu."
              }
            ]
          }
        ]
      },
      {
        id: "case_1_2",
        title: "Caso 102: A Transmissão do Observatório Estelar",
        category: "Tópico Frasal & Resumo Informativo",
        difficulty: "Intermediário",
        xp: 140,
        textIntro: "Interceptamos um relatório confidencial da Doutora Helena Vance, astrofísica do Observatório de Cerro Paranal. Ela usou termos técnicos complexos sobre ondas de rádio e lentes gravitacionais, mas qual é a conclusão essencial do experimento?",
        text: `Após setecentas horas consecutivas de varredura no quadrante sul da constelação de Órion, os dados colhidos pelos radiotelescópios revelaram anomalias repetitivas na frequência de 1420 MHz. Inicialmente, a equipe de engenharia cogitou interferência de satélites orbitais terrestres ou oscilações térmicas no circuito receptor de hélio líquido.

No entanto, simulações computacionais avançadas e verificações cruzadas em três continentes descartaram qualquer falha técnica ou fenômeno natural conhecido, como pulsares ou tempestades solares. Os pulsos seguem uma cadência matemática estrita baseada em números primos com intervalos exatos de 11 segundos.

Essa regularidade comprova, sem margem para dúvida razoável, que não estamos ouvindo o eco aleatório do cosmos, mas sim a primeira assinatura estruturada emitida intencionalmente por uma inteligência cósmica além do nosso sistema solar.`,
        clues: [
          "O primeiro parágrafo traz o contexto e as suspeitas iniciais (que foram descartadas).",
          "O clímax e a ideia nuclear estão na revelação do parágrafo final."
        ],
        questions: [
          {
            id: "q_1_2_1",
            question: "Se você tivesse que redigir um boletim urgente de UMA LINHA para o Alto Comando da Agência resumindo o texto, qual seria?",
            hint: "O resumo perfeito não foca nos cálculos nem nos satélites, mas no fato histórico comprovado.",
            options: [
              {
                id: "A",
                text: "Os radiotelescópios de Órion quebraram devido a problemas de resfriamento com hélio líquido.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO COM O TEXTO! Essa hipótese foi investigada e descartada pela equipe."
              },
              {
                id: "B",
                text: "Foi detectado um sinal matemático comprovadamente artificial, confirmando a primeira evidência de inteligência extraterrestre.",
                isCorrect: true,
                feedback: "🎯 IMPECÁVEL! Você sintetizou a tese principal: o padrão de números primos provou uma emissão intencional de origem externa."
              },
              {
                id: "C",
                text: "Os números primos são a frequência mais comum encontrada em tempestades solares e pulsares do universo.",
                isCorrect: false,
                feedback: "⚠️ DISTORÇÃO DO TEXTO! O texto diz exatamente o oposto: os fenômenos naturais NÃO produzem essa regularidade matemática estrita."
              },
              {
                id: "D",
                text: "A Doutora Helena Vance solicita verbas para consertar três computadores no quadrante sul.",
                isCorrect: false,
                feedback: "⚠️ INVENÇÃO TOTAL! Não há pedido de dinheiro nem computadores quebrados no relatório."
              }
            ]
          }
        ]
      },
      {
        id: "case_1_boss",
        title: "⚡ Desafio de Chefe: O Discurso do Falso Benfeitor",
        category: "Desafio de Síntese Avançada",
        difficulty: "Avançado",
        xp: 220,
        isBoss: true,
        textIntro: "O influente Barão Von Klaus fez um pronunciamento público na televisão prometendo doar uma floresta inteira para a cidade. O público aplaudiu de pé. Mas o analista da Agência suspeita que há uma jogada oculta na ideia central do discurso.",
        text: `Cidadãos desta nobre terra! É com lágrima nos olhos que anuncio a cessão irrevogável dos cem hectares da Reserva dos Pinhais para o patrimônio público. Que as crianças corram entre as árvores e que os pássaros cantem sem temor!

É verdade, meus amigos, que a manutenção daquelas encostas úmidas custava aos cofres da minha empresa milhões de moedas anuais em contenção de deslizamentos de terra e riscos ambientais iminentes. Também não nego que, pela lei vigente, ao transferir a posse dessa área de alto risco geológico para a prefeitura, minhas indústrias recebem automaticamente isenção de 40% em todos os impostos federais pelo próximo meio século.

Mas quem pensaria em cifras diante do sorriso das futuras gerações? Celebremos a generosidade de mãos dadas!`,
        clues: [
          "Preste atenção na contradição entre o tom nobre das palavras ('lágrima nos olhos', 'sorriso das futuras gerações') e os fatos práticos que ele revela no meio do discurso.",
          "O autor finge desdém pelas cifras ('quem pensaria em cifras?'), mas acabou de confessar economia milionária e isenção fiscal."
        ],
        questions: [
          {
            id: "q_1_boss_1",
            question: "Ao analisar a estrutura dos argumentos, a verdadeira motivação do Barão por trás da doação da reserva é:",
            hint: "O que o Barão ganha na prática ao se livrar daquele terreno?",
            options: [
              {
                id: "A",
                text: "Preservar a fauna local e garantir um santuário ecológico eterno para as aves silvestres.",
                isCorrect: false,
                feedback: "⚠️ VOCÊ CAIU NA LÁBIA DO BARÃO! Isso é apenas o floreio retórico que ele usou na abertura para iludir o público."
              },
              {
                id: "B",
                text: "Transferir uma área deficitária e perigosa para o Estado em troca de enorme alívio financeiro e benefícios tributários de longo prazo.",
                isCorrect: true,
                feedback: "🏆 CHEFE DERROTADO! Você desmascarou o núcleo real: ele se livra de um terreno com risco de desabamento que dava prejuízo e ainda garante 50 anos de desconto em impostos!"
              },
              {
                id: "C",
                text: "Abrir uma nova fábrica de móveis de madeira no centro da cidade.",
                isCorrect: false,
                feedback: "⚠️ NÃO CITADO: Ele não vai abrir fábrica de móveis no centro da cidade."
              },
              {
                id: "D",
                text: "Demonstrar arrependimento sincero pelos danos ecológicos causados em sua juventude.",
                isCorrect: false,
                feedback: "⚠️ SENTIMENTALISMO SEM BASE: Ele não demonstra arrependimento, demonstra cálculo de lucros."
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // OPERAÇÃO 2: A ARTE DAS ENTRELINHAS (Inferência & Pistas Implícitas)
  // -------------------------------------------------------------
  {
    id: "op2",
    number: 2,
    title: "A Arte das Entrelinhas",
    subtitle: "O Que o Texto Diz Sem Precisar Falar em Voz Alta",
    description: "Ler apenas o que está explícito é o que qualquer um faz. O verdadeiro poder da interpretação é deduzir o que NÃO foi escrito diretamente, mas foi deixado como rastro irrefutável pelo autor.",
    themeColor: "#a18cd1",
    cases: [
      {
        id: "case_2_1",
        title: "Caso 201: A Janela Aberta na Rua das Sombras",
        category: "Inferência Lógica Textual",
        difficulty: "Intermediário",
        xp: 150,
        textIntro: "O relatório policial descreve a cena em que a jovem detetive Clara entrou no apartamento 304. Leia atentamente cada detalhe físico. Em nenhum momento o texto diz que horas eram ou o que aconteceu minutos antes, mas as pistas revelam tudo.",
        text: `Clara empurrou a porta entreaberta. O chão de tábua corrida estalou sob seus coturnos. Na pia, duas xícaras de porcelana ainda soltavam fiapos tênues de vapor aromático de café fresco, e uma colher de prata pingava pequenas gotas escuras sobre o guardanapo de linho.

A cortina de renda balançava freneticamente com o vento gelado que entrava pelo basculante escancarado para o beco. Perto da soleira da janela, Clara notou marcas de barro fresco ainda úmido com o desenho da sola de um sapato masculino número 42.

Ao lado do cinzeiro vazio, um bilhete amassado trazia a frase: 'Eles já descobriram. Saia agora'. Clara tocou o tampo da mesa: a poeira havia sido arrastada às pressas pelo canto de uma maleta pesada.`,
        clues: [
          "O café ainda soltava vapor! O que isso prova sobre quando os ocupantes estavam ali?",
          "O barro está fresco e a janela aberta para o beco com marcas de sola de sapato."
        ],
        questions: [
          {
            id: "q_2_1_1",
            question: "Com base nas evidências materiais do texto, é correto inferir que:",
            hint: "Quanto tempo dura o vapor de uma xícara de café quente servida na mesa?",
            options: [
              {
                id: "A",
                text: "O apartamento estava abandonado há várias semanas antes da chegada de Clara.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO GRAVE: Café não solta vapor durante semanas! O café quente prova que a saída ocorreu instantes antes."
              },
              {
                id: "B",
                text: "Havia pelo menos duas pessoas no local poucos minutos antes, e uma fuga repentina ocorreu pela janela após um aviso de perigo.",
                isCorrect: true,
                feedback: "🎯 DEDUÇÃO BRILHANTE! Duas xícaras fumegantes indicam duas pessoas; o café quente indica pouquíssimos minutos; o bilhete de alerta e as marcas de bota na janela aberta comprovam a rota de fuga repentina!"
              },
              {
                id: "C",
                text: "Clara foi ao apartamento para tomar café da manhã com seu marido número 42.",
                isCorrect: false,
                feedback: "⚠️ EXTRAPOLAÇÃO ILÓGICA: Clara é uma investigadora que entrou com coturno em cena de suspeita; o número 42 é da pegada de barro."
              },
              {
                id: "D",
                text: "O morador saiu tranquilamente pela porta da frente para comprar pão na padaria.",
                isCorrect: false,
                feedback: "⚠️ IGNOROU AS PISTAS: A janela estava escancarada com barro, e o bilhete dizia 'Saia agora'."
              }
            ]
          },
          {
            id: "q_2_1_2",
            question: "A frase 'Eles já descobriram. Saia agora' PRESSUPÕE linguisticamente que:",
            hint: "O verbo 'descobriram' e a ordem 'saia agora' indicam a existência de um segredo anterior.",
            options: [
              {
                id: "A",
                text: "O destinatário do bilhete estava realizando uma atividade secreta ou proibida que temia ser revelada.",
                isCorrect: true,
                feedback: "🎯 ANÁLISE LINGUÍSTICA PERFEITA! Só se pode 'descobrir' algo que antes estava escondido. O pressuposto é que existia algo sigiloso e arriscado sendo encoberto."
              },
              {
                id: "B",
                text: "A polícia havia organizado uma festa surpresa de aniversário no apartamento.",
                isCorrect: false,
                feedback: "⚠️ INCOERÊNCIA COM O TOM DO TEXTO: O tom é de suspense investigativo, não comemoração."
              },
              {
                id: "C",
                text: "Os cientistas finalmente descobriram a cura para a poeira das mesas antigas.",
                isCorrect: false,
                feedback: "⚠️ DISTORÇÃO ABSURDA: A palavra 'descobriram' refere-se aos perseguidores, não a médicos."
              },
              {
                id: "D",
                text: "Ninguém nunca soube o paradeiro de qualquer habitante daquela rua.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO: Se 'já descobriram', então alguém soube sim."
              }
            ]
          }
        ]
      },
      {
        id: "case_2_2",
        title: "Caso 202: O Bilhete do Diplomata Evasivo",
        category: "Subentendidos & Pressupostos Gramaticais",
        difficulty: "Intermediário",
        xp: 160,
        textIntro: "O Embaixador enviou um memorando confidencial aos seus subordinados. Preste atenção cirúrgica nas palavras 'voltou a', 'finalmente' e 'até mesmo'. Elas carregam segredos ocultos que revelam o passado sem precisar contá-lo diretamente.",
        text: `Prezada equipe,

Informo que o Ministro da Fazenda voltou a comparecer às reuniões ministeriais nesta manhã de terça-feira. Após longas semanas de silêncio, ele finalmente concordou em abrir as planilhas contábeis para auditoria independente. Até mesmo o Secretário de Obras, conhecido por sua blindagem inabalável, admitiu que certas contratações merecem revisão minuciosa.

Diante disso, solicito cautela redobrada nas declarações públicas à imprensa. Não alimentem especulações desnecessárias.`,
        clues: [
          "Se alguém 'VOLTOU A' comparecer, o que isso significa sobre os dias anteriores?",
          "Se ele 'FINALMENTE' concordou, o que estava acontecendo durante as semanas passadas?",
          "O operador 'ATÉ MESMO' serve para incluir o caso mais improvável ou resistente."
        ],
        questions: [
          {
            id: "q_2_2_1",
            question: "A partir do uso do verbo 'voltou a comparecer', o leitor atento deduz que o Ministro:",
            hint: "A estrutura 'voltar a + infinitivo' indica repetição após uma interrupção.",
            options: [
              {
                id: "A",
                text: "Nunca havia participado de uma reunião ministerial em toda a sua vida pública.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO: Se nunca participou, ele iria pela 'primeira vez', não 'voltaria a comparecer'."
              },
              {
                id: "B",
                text: "Estava ausente ou afastado das reuniões por um período antes desta terça-feira.",
                isCorrect: true,
                feedback: "🎯 PRECISÃO GRAMATICAL! O marcador de pressuposição 'voltou a' exige que a ação já ocorria antes e sofreu uma interrupção prévia. Excelente leitura das entrelinhas!"
              },
              {
                id: "C",
                text: "Decidiu demitir todos os ministros presentes logo após o almoço.",
                isCorrect: false,
                feedback: "⚠️ EXTRAPOLAÇÃO: O texto não fala sobre demissão nenhuma."
              },
              {
                id: "D",
                text: "Não sabe onde fica a sala de reuniões e precisou de um mapa.",
                isCorrect: false,
                feedback: "⚠️ INTERPRETAÇÃO DESCABIDA."
              }
            ]
          },
          {
            id: "q_2_2_2",
            question: "A palavra 'finalmente' no trecho 'ele finalmente concordou' introduz no texto uma ideia de que a abertura das contas:",
            hint: "O que a palavra 'finalmente' transmite sobre a espera ou a resistência do ministro?",
            options: [
              {
                id: "A",
                text: "Era uma exigência que enfrentava demora, hesitação ou resistência anterior por parte dele.",
                isCorrect: true,
                feedback: "🎯 RAIO-X TEXTUAL! A palavra 'finalmente' carrega a carga semântica de algo esperado há tempo, que custou a acontecer devido a recusa ou espera prolongada."
              },
              {
                id: "B",
                text: "Aconteceu de forma espontânea, rápida e com entusiasmo logo no primeiro minuto.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO: Se fosse espontâneo e instantâneo, usaria 'prontamente' ou 'imediatamente', nunca 'finalmente'."
              },
              {
                id: "C",
                text: "Foi uma decisão irrelevante que ninguém no ministério esperava ou queria.",
                isCorrect: false,
                feedback: "⚠️ INCORRETO: O próprio 'finalmente' denota alívio ou conclusão de algo muito aguardado."
              },
              {
                id: "D",
                text: "Será cancelada antes da próxima sexta-feira.",
                isCorrect: false,
                feedback: "⚠️ EXTRAPOLAÇÃO SEM FUNDAMENTO."
              }
            ]
          }
        ]
      },
      {
        id: "case_2_boss",
        title: "⚡ Desafio de Chefe: O Enigma dos Três Suspeitos",
        category: "Desafio de Inferência Cruzada",
        difficulty: "Avançado",
        xp: 240,
        isBoss: true,
        textIntro: "O colar da Condessa de Valença desapareceu durante o baile de máscaras às 22h. Três convidados foram ouvidos pela polícia. Um deles cometeu um deslize imperdoável nas entrelinhas e entregou a própria culpa!",
        text: `DEPOIMENTO 1 (Lord Julian): 'Estava no jardim observando as estrelas desde as 21h30. A noite estava tão límpida que vi a constelação de Touro com nitidez. Só entrei no salão quando ouvi os gritos da Condessa.'

DEPOIMENTO 2 (Baronesa Sophia): 'Passei a noite inteira na biblioteca lendo os sonetos de Camões. Havia uma lareira acesa e nenhum barulho do salão de dança chegava até ali. Só soube do ocorrido hoje pela manhã.'

DEPOIMENTO 3 (Monsenhor Pedro): 'Às 22h eu estava na capela do casarão rezando o terço. Quando o relógio da torre bateu as dez badaladas, olhei pela rosácea de vidro e vi Lord Julian correndo pelo jardim sob a chuva torrencial que desabava lá fora, com a capa encharcada cobrindo algo brilhante sob o braço.'`,
        clues: [
          "Compare atentamente o depoimento de Lord Julian com o depoimento de Monsenhor Pedro sobre as CONDIÇÕES METEOROLÓGICAS (o clima daquela noite)!",
          "Pode uma noite estar 'tão límpida que se vê estrelas e constelações' e ao mesmo tempo ter uma 'chuva torrencial que desaba' às 22h?",
          "O relatório oficial da cidade confirmou que naquela noite houve uma seca histórica sem uma única gota de chuva."
        ],
        questions: [
          {
            id: "q_2_boss_1",
            question: "Ao cruzar as pistas implícitas dos relatos com o fato de que a noite foi completamente seca e estrelada, qual testemunha forjou uma mentira e incriminou falsamente um inocente?",
            hint: "Quem inventou uma tempestade dramática que nunca aconteceu para criar uma narrativa de fuga?",
            options: [
              {
                id: "A",
                text: "Baronesa Sophia, porque ninguém lê poesia clássica durante um baile de máscaras festivo.",
                isCorrect: false,
                feedback: "⚠️ JULGAMENTO DE GOSTO PESSOAL! Gostar de poesia não é crime nem contradição factual textual. As evidências precisam de base lógica no texto."
              },
              {
                id: "B",
                text: "Monsenhor Pedro, pois sua descrição de 'chuva torrencial e capa encharcada' colide frontalmente com a noite límpida e estrelada, revelando um relato inventado para incriminar Julian.",
                isCorrect: true,
                feedback: "🏆 CHEFE DERROTADO! GENIAL! Você cruzou os depoimentos: Pedro inventou uma chuva torrencial cinematográfica para fazer Lord Julian parecer o ladrão correndo na lama, mas em uma noite límpida e estrelada é fisicamente impossível haver tempestade torrencial!"
              },
              {
                id: "C",
                text: "Lord Julian, porque constelações não podem ser vistas no céu durante o mês de outubro.",
                isCorrect: false,
                feedback: "⚠️ EXTRAPOLAÇÃO E CONHECIMENTO EXTERNO INDEVIDO: O texto não discute astrologia nem astronomia empírica de calendário."
              },
              {
                id: "D",
                text: "A Condessa de Valença, pois ela não tinha nenhum colar verdadeiro.",
                isCorrect: false,
                feedback: "⚠️ INVENTOU DADOS: O texto nunca pôs em dúvida a existência do colar."
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // OPERAÇÃO 3: O FILTRO DA VERDADE (Fato vs. Opinião & Viés do Autor)
  // -------------------------------------------------------------
  {
    id: "op3",
    number: 3,
    title: "O Filtro da Verdade",
    subtitle: "Distinguindo Dados Comprovados de Julgamentos Subjetivos",
    description: "Um dos maiores perigos na interpretação é confundir o que REALMENTE ACONTECEU (fato) com o que o autor SENTE ou JULGA sobre aquilo (opinião). Aqui você treinará seu radar contra manipulações e opiniões disfarçadas de fatos.",
    themeColor: "#f6d365",
    cases: [
      {
        id: "case_3_1",
        title: "Caso 301: O Duelo dos Jornais Rivais",
        category: "Fato Objetivo vs. Opinião Adjetivada",
        difficulty: "Intermediário",
        xp: 150,
        textIntro: "Dois jornais da cidade noticiaram a inauguração de uma ciclovia na Avenida Paulista. O acontecimento físico foi o mesmo, mas a forma de narrar mostra como os adjetivos e a escolha de palavras tentam induzir o leitor a tomar um lado.",
        text: `JORNAL A (A Voz do Progresso):
'Neste domingo ensolarado, a prefeitura deu um passo gigantesco rumo à modernidade ao inaugurar a espetacular ciclovia de 8 quilômetros na Avenida Paulista. Mais de dez mil cidadãos conscientes tomaram a via com sorrisos radiantes, celebrando o fim da tirania dos automóveis barulhentos e poluentes. É a obra mais genial e necessária que a cidade já testemunhou em décadas.'

JORNAL B (O Diário Paulistano):
'Ontem, às 9h, a administração municipal entregou a pista exclusiva para bicicletas na Avenida Paulista, com extensão de 8 km e custo de 12 milhões de reais. O trânsito de veículos comuns na faixa da esquerda foi reduzido a 40 km/h, gerando congestionamento de 4 km entre as 10h e as 13h, segundo dados oficiais da Companhia de Engenharia de Tráfego.'`,
        clues: [
          "Fato: pode ser medido, fotografado, verificado com números e dados neutros.",
          "Opinião: usa adjetivos de julgamento ('espetacular', 'genial', 'tirania', 'sorrisos conscientes')."
        ],
        questions: [
          {
            id: "q_3_1_1",
            question: "Comparando os dois textos, qual trecho do Jornal A expressa uma OPINIÃO PURA e NÃO um fato verificável?",
            hint: "Procure a frase que contém um julgamento de valor impossível de ser medido cientificamente.",
            options: [
              {
                id: "A",
                text: "'inaugurar a ciclovia de 8 quilômetros na Avenida Paulista.'",
                isCorrect: false,
                feedback: "⚠️ ISSO É UM FATO! O comprimento de 8 km pode ser medido com fita métrica e a inauguração ocorreu de verdade."
              },
              {
                id: "B",
                text: "'É a obra mais genial e necessária que a cidade já testemunhou em décadas.'",
                isCorrect: true,
                feedback: "🎯 IDENTIFICAÇÃO PERFEITA! Dizer que uma obra é 'a mais genial e necessária' é um ponto de vista totalmente subjetivo e pessoal do jornalista, não um dado científico neutro!"
              },
              {
                id: "C",
                text: "'Neste domingo...'",
                isCorrect: false,
                feedback: "⚠️ FATO TEMPORAL: O dia da semana em que ocorreu o evento é um dado cronológico objetivo."
              },
              {
                id: "D",
                text: "'custo de 12 milhões de reais.'",
                isCorrect: false,
                feedback: "⚠️ FATO FINANCEIRO: Este trecho é do Jornal B e representa um valor contábil documental."
              }
            ]
          },
          {
            id: "q_3_1_2",
            question: "Qual é a principal diferença de postura comunicativa entre o Jornal A e o Jornal B?",
            hint: "O Jornal A tenta convencer e emocionar; o Jornal B relata com números e fontes oficiais.",
            options: [
              {
                id: "A",
                text: "O Jornal A adota um tom exaltado e opinativo para defender a obra, enquanto o Jornal B prioriza dados quantitativos e registros oficiais.",
                isCorrect: true,
                feedback: "🎯 ANÁLISE DE POSTURA DISCURSIVA NOTA 10! Você percebeu a diferença entre jornalismo panfletário/opinativo e jornalismo factual/informativo."
              },
              {
                id: "B",
                text: "O Jornal B mentiu sobre os quilômetros porque odeia bicicletas e prefere cavalos.",
                isCorrect: false,
                feedback: "⚠️ COMENTÁRIO INFANTIL SEM BASE NO TEXTO: Não há cavalos nem ódio comprovado a bicicletas."
              },
              {
                id: "C",
                text: "Ambos os jornais expressaram exatamente os mesmos sentimentos sem nenhuma divergência.",
                isCorrect: false,
                feedback: "⚠️ CEGUEIRA DE CONTRASTE: Os dois textos possuem tons completamente distintos de vocabulário."
              },
              {
                id: "D",
                text: "O Jornal A foi escrito por motoristas de caminhão e o Jornal B por ciclistas profissionais.",
                isCorrect: false,
                feedback: "⚠️ EXTRAPOLAÇÃO ILÓGICA."
              }
            ]
          }
        ]
      },
      {
        id: "case_3_2",
        title: "Caso 302: A Resenha do Crítico Gastronômico Fantasma",
        category: "Detecção de Viés & Julgamento Subjetivo",
        difficulty: "Intermediário",
        xp: 160,
        textIntro: "O crítico gastronômico Pierre Gourmet publicou sua análise sobre o novo restaurante 'Sabor do Mar'. O dono do restaurante alega que o crítico usou adjetivos cruéis baseados apenas no seu gosto pessoal, e não na qualidade técnica dos pratos.",
        text: `O restaurante abriu suas portas às 19h com capacidade para oitenta mesas. O cardápio oferece dezesseis opções de peixes e frutos do mar, com preços variando entre quarenta e duzentos reais. Até aí, a proposta administrativa cumpre as formalidades.

Contudo, o ambiente peca por um desespero visual imperdoável: as paredes pintadas de azul-turquesa transmitem uma vulgaridade que fere a sensibilidade de qualquer esteta requintado. O risoto de camarão chegou à mesa à temperatura de 62 graus Celsius, mas a consistência do grão é uma afronta insuportável ao autêntico paladar italiano. A sobremesa de manga, por sua vez, é excessivamente adocicada para pessoas que apreciam a verdadeira gastronomia de elite.`,
        clues: [
          "Observe as expressões: 'vulgaridade que fere', 'afronta insuportável', 'pessoas que apreciam a verdadeira gastronomia'.",
          "Todas essas expressões são juízos de valor arrogantes baseados no critério individual do crítico."
        ],
        questions: [
          {
            id: "q_3_2_1",
            question: "Constitui um FATO incontestável apresentado no texto pelo crítico:",
            hint: "O que independe do gosto do crítico e foi medido/registrado?",
            options: [
              {
                id: "A",
                text: "O restaurante transmite uma vulgaridade imperdoável a quem tem bom gosto.",
                isCorrect: false,
                feedback: "⚠️ OPINIÃO: 'Vulgaridade' é uma interpretação estética subjetiva do crítico."
              },
              {
                id: "B",
                text: "O risoto tem uma consistência que afronta a culinária da Itália.",
                isCorrect: false,
                feedback: "⚠️ OPINIÃO: Dizer que é uma afronta é a reação emocional e cultural dele."
              },
              {
                id: "C",
                text: "O cardápio oferece dezesseis opções de frutos do mar com preços entre quarenta e duzentos reais.",
                isCorrect: true,
                feedback: "🎯 EXCELENTE! Isso é um fato objetivo: basta pegar o menu impresso e contar os pratos e olhar a etiqueta de preço!"
              },
              {
                id: "D",
                text: "A manga é doce demais para pessoas de elite.",
                isCorrect: false,
                feedback: "⚠️ OPINIÃO PRECONCEITUOSA: 'Gosto de elite' é um juízo de valor pessoal."
              }
            ]
          }
        ]
      },
      {
        id: "case_3_boss",
        title: "⚡ Desafio de Chefe: O Dossiê da Pílula Milagrosa",
        category: "Desafio de Desmascarar Falácias",
        difficulty: "Avançado",
        xp: 260,
        isBoss: true,
        textIntro: "O Laboratório Vitasol lançou uma campanha maciça vendendo cápsulas de 'Extrato de Alga Lunar'. O anúncio tenta mascarar promessas vazias como se fossem ciência comprovada. Encontre onde está a manipulação textual!",
        text: `Cansado de se sentir esgotado após o almoço? Chegou o revolucionário NeuroAlga 3000!

Produzido com algas colhidas manualmente nas profundezas intocadas do Oceano Pacífico, este suplemento milagroso já conquistou o coração de celebridades de renome internacional, como o famoso cantor pop Daniel Lux, que declarou em suas redes sociais: 'Desde que passei a tomar o NeuroAlga, sinto que minha mente vibra numa frequência divina'.

Embora nenhum ensaio clínico duplo-cego com controle de placebo tenha sido publicado em revistas científicas indexadas até a presente data, mais de 98% dos nossos clientes que responderam à enquete no nosso próprio site afirmaram sentir 'energia renovada'. Não deixe a fadiga roubar seu futuro; compre agora o produto definitivo que a indústria farmacêutica tradicional não quer que você conheça!`,
        clues: [
          "Preste atenção em QUEM atesta a eficácia do produto: um cantor pop famoso (apelo à autoridade sem autoridade médica).",
          "Veja o que o texto confessa: NÃO HÁ nenhum ensaio clínico ou estudo científico com controle de placebo!",
          "A enquete foi feita no próprio site da empresa com pessoas que já compraram o produto."
        ],
        questions: [
          {
            id: "q_3_boss_1",
            question: "Ao analisar criticamente as estratégias persuasivas do anúncio, conclui-se que o texto:",
            hint: "O anúncio tem base científica ou apela para depoimentos de famosos e teorias da conspiração?",
            options: [
              {
                id: "A",
                text: "Apresenta sólidas evidências médicas e farmacológicas comprovadas por revistas científicas internacionais renomadas.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO COM O TEXTO! O texto admite explicitamente que NENHUM ensaio clínico duplo-cego foi publicado!"
              },
              {
                id: "B",
                text: "Utiliza falácias de apelo à celebridade, enquetes sem rigor metodológico e teorias conspiratórias para criar ilusão de eficácia sem respaldo científico real.",
                isCorrect: true,
                feedback: "🏆 CHEFE DERROTADO! Você desmontou a armadilha publicitária! O texto usa depoimento de cantor pop (que não é médico), enquete viciada de site próprio e o clássico clichê 'o que eles não querem que você saiba' para esconder a total ausência de testes científicos!"
              },
              {
                id: "C",
                text: "Comprova que o cantor pop Daniel Lux realizou as cirurgias e experimentos médicos em si mesmo.",
                isCorrect: false,
                feedback: "⚠️ EXTRAPOLAÇÃO BIZARRA: O cantor apenas gravou um depoimento para as redes sociais."
              },
              {
                id: "D",
                text: "Tem como objetivo alertar a população sobre o perigo de ingerir algas colhidas no Oceano Pacífico.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO DE PROPÓSITO: O texto quer vender o produto, não alertar contra ele."
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // OPERAÇÃO 4: MÁSCARAS DA LINGUAGEM (Ironia, Sarcasmo & Figuras de Linguagem)
  // -------------------------------------------------------------
  {
    id: "op4",
    number: 4,
    title: "Máscaras da Linguagem",
    subtitle: "Quando as Palavras Dizem o Contrário do Sentido Aparente",
    description: "Autores refinados não dizem tudo na lata. Eles usam ironia, metáfora, hipérbole e eufemismo. Se você ler apenas ao pé da letra, entenderá o exato oposto da verdade. Vamos afiar o seu radar de figuras de linguagem!",
    themeColor: "#ff76ac",
    cases: [
      {
        id: "case_4_1",
        title: "Caso 401: O E-mail da Chefe de Segurança",
        category: "Ironia Situacional & Sarcasmo Corporativo",
        difficulty: "Intermediário",
        xp: 160,
        textIntro: "O programador Roberto enviou um código para produção sem testar na sexta-feira às 18h e derrubou o servidor do banco por doze horas. Na segunda-feira de manhã, ele recebeu o seguinte e-mail da Diretora Valéria:",
        text: `Assunto: Parabéns pela pontaria cirúrgica!

Prezado Roberto,

Gostaria de registrar meus mais efusivos cumprimentos pelo seu brilhante espírito de iniciativa na última sexta-feira. Escolher exatamente as 18 horas para subir uma atualização sem qualquer teste prévio foi, sem dúvida, uma jogada digna de um mestre do xadrez.

Afinal, quem não gosta de passar o final de semana inteiro trancado no escritório sob luz fluorescente comendo pizza fria e atendendo centenas de clientes furiosos? Sua audácia proporcionou à nossa equipe de plantão uma oportunidade inesquecível de confraternização forçada.

Com certeza a diretoria saberá recompensar esse monumento à competência na nossa reunião de avaliação de desempenho às 14h. Não se atrase.`,
        clues: [
          "Será que a chefe está REALMENTE feliz por ter passado o final de semana trabalhando e comendo pizza fria?",
          "Quando ela diz 'parabéns pela pontaria', 'brilhante iniciativa' e 'monumento à competência', qual é o tom real?",
          "Isso é a clássica IRONIA: dizer o oposto com a intenção de criticar severamente."
        ],
        questions: [
          {
            id: "q_4_1_1",
            question: "Ao interpretar o e-mail em sua totalidade, a real intenção da Diretora Valéria é:",
            hint: "Ela quer promover Roberto ou repreendê-lo duramente pelo erro grave?",
            options: [
              {
                id: "A",
                text: "Elogiar o talento de enxadrista de Roberto e convidá-lo para uma festa da empresa.",
                isCorrect: false,
                feedback: "⚠️ LEITURA AO PÉ DA LETRA! A metáfora do xadrez é irônica. Ela está furiosa pelo prejuízo causado!"
              },
              {
                id: "B",
                text: "Censurar com severidade o erro irresponsável cometido por Roberto, usando sarcasmo e ironia para enfatizar o desastre do final de semana.",
                isCorrect: true,
                feedback: "🎯 RADAR DE IRONIA LIGADO NO MÁXIMO! A diretora usou ironia mordaz em cada adjetivo: elogios falsos para apontar uma falha imperdoável que será punida na reunião."
              },
              {
                id: "C",
                text: "Agradecer a Roberto por ter encomendado pizzas frias para o jantar da equipe.",
                isCorrect: false,
                feedback: "⚠️ DETALHE LITERAL DISTORCIDO: A pizza fria foi consequência do trabalho emergencial de madrugada."
              },
              {
                id: "D",
                text: "Pedir desculpas a Roberto por ter atrapalhado seu final de semana de descanso.",
                isCorrect: false,
                feedback: "⚠️ INVERSÃO COMPLETA DOS PAPÉIS."
              }
            ]
          },
          {
            id: "q_4_1_2",
            question: "A frase 'Sua audácia proporcionou à nossa equipe uma oportunidade inesquecível de confraternização forçada' contém um recurso de linguagem que expressa:",
            hint: "Existe uma contradição intencional entre 'confraternização' (que deveria ser alegre e espontânea) e 'forçada'.",
            options: [
              {
                id: "A",
                text: "Uma contradição irônica (oxímoro), mostrando que o evento foi um martírio desgastante e não uma celebração agradável.",
                isCorrect: true,
                feedback: "🎯 BRILHANTE! Uma 'confraternização forçada' no meio de uma crise com clientes furiosos é puro sarcasmo para destacar o suplício que a equipe enfrentou."
              },
              {
                id: "B",
                text: "Uma declaração de amor e companheirismo fraternal entre os funcionários.",
                isCorrect: false,
                feedback: "⚠️ DESVIO TOTAL DO SENTIDO: Ninguém ama trabalhar compulsoriamente no final de semana."
              },
              {
                id: "C",
                text: "Uma regra do manual de recursos humanos para festas de aniversário na empresa.",
                isCorrect: false,
                feedback: "⚠️ FORA DE CONTEXTO."
              },
              {
                id: "D",
                text: "Um pedido para que a empresa contrate mais garçons para servir pizza.",
                isCorrect: false,
                feedback: "⚠️ NÃO TEM SENTIDO LÓGICO COM O TEXTO."
              }
            ]
          }
        ]
      },
      {
        id: "case_4_2",
        title: "Caso 402: O Poema Criptografado do Guardião",
        category: "Metáfora, Metonímia & Personificação",
        difficulty: "Intermediário",
        xp: 170,
        textIntro: "O poeta e espião Vicente deixou quatro estrofes descrevendo uma grande ameaça à sua terra natal durante o século XIX. O texto não usa a palavra 'indústria' nem 'trem', mas suas figuras de linguagem pintam o cenário como um quadro vivo.",
        text: `O monstro de ferro e costelas de carvão
Rasga o ventre verde da campina adormecida.
Seu apito estridente acorda a solidão,
E a fumaça engole o azul de nossa vida.

Ele devora montanhas com seu ventre em chamas,
Cuspindo faíscas que incendeiam o trigal.
Nas cidades cinzentas onde os homens tramam,
A engrenagem do tempo substituiu o pardal.

Não há mais orvalho na relva esmagada,
Apenas o rangido do aço no trilho sedento.
A terra chora em silêncio sua honra roubada,
Enquanto o progresso corre montado no vento.`,
        clues: [
          "O 'monstro de ferro e costelas de carvão' que corre em 'trilho sedento' com 'apito estridente': que máquina histórica é essa?",
          "'A engrenagem do tempo substituiu o pardal': o trabalho mecânico e das fábricas tomando o lugar da natureza pura.",
          "'A terra chora em silêncio': personificação (dar sentimentos humanos à terra)."
        ],
        questions: [
          {
            id: "q_4_2_1",
            question: "A metáfora central 'O monstro de ferro e costelas de carvão' que rasga a campina refere-se historicamente a:",
            hint: "Que máquina movida a carvão e feita de ferro corre sobre trilhos?",
            options: [
              {
                id: "A",
                text: "Um dinossauro mutante carnívoro que escapou de um laboratório subterrâneo.",
                isCorrect: false,
                feedback: "⚠️ LITERALISMO FANTASIOSO! Poemas literários usam metáforas para representar a realidade, não filmes de ficção científica."
              },
              {
                id: "B",
                text: "A locomotiva a vapor (o trem) como símbolo do avanço avassalador da Revolução Industrial sobre a natureza.",
                isCorrect: true,
                feedback: "🎯 DECODIFICAÇÃO POÉTICA NOTA MIL! O trem a vapor ('monstro de ferro com costelas de carvão', 'aço no trilho sedento') representa o choque da industrialização contra o ambiente rural."
              },
              {
                id: "C",
                text: "Uma fornalha de padaria usada para queimar trigo estragado.",
                isCorrect: false,
                feedback: "⚠️ REDUÇÃO ABSURDA: Uma fornalha de padaria não anda sobre trilhos rasgando campinas."
              },
              {
                id: "D",
                text: "Um trator elétrico moderno usado para plantar orvalho nas árvores.",
                isCorrect: false,
                feedback: "⚠️ ANACRONISMO: O texto fala de carvão e apito estridente do século XIX."
              }
            ]
          },
          {
            id: "q_4_2_2",
            question: "O verso 'A engrenagem do tempo substituiu o pardal' simboliza:",
            hint: "Pardal = natureza, canto livre; Engrenagem = relógio mecânico de fábrica, rotina rígida.",
            options: [
              {
                id: "A",
                text: "A substituição dos ritmos naturais e da liberdade silvestre pelo ritmo mecânico e artificial da vida urbana industrial.",
                isCorrect: true,
                feedback: "🎯 INTERPRETAÇÃO PROFUNDA! O canto do pássaro livre cedeu espaço ao tique-taque rígido das fábricas e máquinas."
              },
              {
                id: "B",
                text: "Uma invenção científica de pássaros robóticos mecânicos que comem carvão nas praças.",
                isCorrect: false,
                feedback: "⚠️ ERRO DE LITERALIDADE: Não existem pássaros robóticos no poema."
              },
              {
                id: "C",
                text: "Que todos os pássaros da floresta aprenderam a construir relógios de corda.",
                isCorrect: false,
                feedback: "⚠️ INCOERENTE."
              },
              {
                id: "D",
                text: "A vitória definitiva das aves na guerra biológica contra as engrenagens de ferro.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO: O verso diz que a engrenagem 'substituiu' o pardal, ou seja, a máquina dominou a ave."
              }
            ]
          }
        ]
      },
      {
        id: "case_4_boss",
        title: "⚡ Desafio de Chefe: O Banquete dos Elogios Falsos",
        category: "Desafio de Eufemismo & Ambiguidade Intencional",
        difficulty: "Avançado",
        xp: 270,
        isBoss: true,
        textIntro: "O Embaixador do Reino do Norte fez um brinde solene anunciando um novo tratado de paz com o Reino do Sul. Todo o tratado está repleto de eufemismos requintados para camuflar uma invasão militar real.",
        text: `Nobre soberano e estimados dignitários! Celebramos hoje o triunfo da harmonia entre nossos povos.

Para assegurar que nenhuma desordem perturbe os lares deste país amigo, nossas tropas pacificadoras farão apenas uma 'readequação de posicionamento territorial', assumindo a guarda provisória de todos os portos marítimos, cofres alfandegários e torres de comunicação.

Não se trata de cobrança de tributos, mas sim de uma 'solicitação de contribuição de segurança mútua compulsória'. Caso ocorra alguma 'divergência de conduta cívica' por parte de cidadãos revoltados, nossos soldados aplicarão 'medidas profiláticas de contenção pacífica com uso de baionetas'. Que a paz reine eterna sob nosso generoso abraço protetor!`,
        clues: [
          "O que é 'readequação de posicionamento territorial' assumindo portos e torres? É uma ocupação militar!",
          "O que é 'contribuição mútua compulsória'? É um imposto forçado ou extorsão!",
          "O que é 'medidas profiláticas com uso de baioneta'? É repressão armada violenta!"
        ],
        questions: [
          {
            id: "q_4_boss_1",
            question: "Ao traduzir os eufemismos diplomáticos para a realidade dos fatos, o discurso do embaixador revela:",
            hint: "O que o texto disfarça com palavras suaves e técnicas?",
            options: [
              {
                id: "A",
                text: "A entrega de donativos e ajuda humanitária com voluntários desarmados.",
                isCorrect: false,
                feedback: "⚠️ VOCÊ CAIU NO EUFEMISMO! Voluntários desarmados não ocupam portos com baionetas."
              },
              {
                id: "B",
                text: "Uma invasão militar e intervenção econômica total camuflada sob termos burocráticos amenos que tentam suavizar a violência da dominação.",
                isCorrect: true,
                feedback: "🏆 CHEFE DERROTADO! Você decodificou os eufemismos com maestria cirúrgica! 'Readequação territorial' = ocupação; 'contribuição compulsória' = saque/tributo; 'contenção com baioneta' = massacre armado. Sensacional!"
              },
              {
                id: "C",
                text: "Uma declaração de rendição incondicional do Reino do Norte perante a superioridade do Sul.",
                isCorrect: false,
                feedback: "⚠️ INVERSÃO: O Norte é quem está mandando tropas para ocupar o Sul."
              },
              {
                id: "D",
                text: "A organização de uma regata de barcos a vela nos portos marítimos.",
                isCorrect: false,
                feedback: "⚠️ RIDÍCULO E TOTALMENTE FORA DE SENTIDO."
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // OPERAÇÃO 5: A PONTE INVISÍVEL (Conectivos & Coesão Referencial)
  // -------------------------------------------------------------
  {
    id: "op5",
    number: 5,
    title: "A Ponte Invisível",
    subtitle: "Conectivos e Pronomes: Os Mestres que Mudam o Destino da Frase",
    description: "Uma única palavrinha como 'MAS', 'EMBORA', 'PORTANTO' ou 'DESDE QUE' pode inverter 180 graus o significado de um parágrafo inteiro! E se você não souber a quem pronomes como 'ele', 'esse' ou 'o qual' se referem, acusará o inocente em vez do culpado.",
    themeColor: "#4facfe",
    cases: [
      {
        id: "case_5_1",
        title: "Caso 501: O Contrato do Mercador Astuto",
        category: "Conectivos Adversativos, Concessivos & Condicionais",
        difficulty: "Intermediário",
        xp: 170,
        textIntro: "O Mercador Silas redigiu uma cláusula de sociedade comercial com o jovem artesão Tiago. Tiago achou a cláusula fantástica porque começou com elogios à sua habilidade, mas o perito da Agência apontou o conectivo que armou a ratoeira.",
        text: `CLÁUSULA 7ª:
O artesão Tiago terá direito a receber 80% dos lucros líquidos advindos da venda das joias na feira imperial, reconhecendo-se seu incomparável talento na lapidação das pedras.

CONQUANTO tal percentual tenha sido acordado verbalmente, o pagamento efetivo das referidas parcelas ficará condicionado à quitação prévia de todas as despesas operacionais da oficina declaradas unilateralmente pelo sócio Silas, CONTUDO nenhuma prestação de contas detalhada será exigida deste último. PORTANTO, até que a soma das despesas arbitradas seja integralmente coberta, o valor remanescente destinado a Tiago será nulo.`,
        clues: [
          "'Conquanto' = embora / ainda que (estabelece concessão, avisando que há um obstáculo).",
          "'Contudo' = mas / porém (estabelece oposição: Silas não precisará prestar contas de que despesas são essas).",
          "'Portanto' = logo / por conseguinte (conclusão: Tiago receberá zero!)."
        ],
        questions: [
          {
            id: "q_5_1_1",
            question: "Qual é o efeito do conectivo 'PORTANTO' no fechamento da cláusula contratual?",
            hint: "'Portanto' expressa causa, oposição, concessão ou CONCLUSÃO lógica?",
            options: [
              {
                id: "A",
                text: "Introduzir uma oposição surpreendente aos cálculos anteriores.",
                isCorrect: false,
                feedback: "⚠️ ERRO CONECTIVO: Quem introduz oposição é 'mas', 'porém', 'contudo', não 'portanto'."
              },
              {
                id: "B",
                text: "Concluir logicamente, a partir das condições anteriores, que Tiago não receberá dinheiro algum enquanto Silas alegar despesas.",
                isCorrect: true,
                feedback: "🎯 DOMÍNIO DA COESÃO! 'Portanto' é uma conjunção conclusiva: ela arremata os argumentos anteriores mostrando o resultado prático devastador para o jovem artesão."
              },
              {
                id: "C",
                text: "Indicar uma hipótese improvável que nunca se tornará realidade no mundo dos negócios.",
                isCorrect: false,
                feedback: "⚠️ 'Portanto' não é condicional hipotético."
              },
              {
                id: "D",
                text: "Pedir desculpas cordiais pela falta de lucros da joalheria imperial.",
                isCorrect: false,
                feedback: "⚠️ FORA DE SENTIDO GRAMATICAL."
              }
            ]
          },
          {
            id: "q_5_1_2",
            question: "A palavra 'CONQUANTO', utilizada no início do segundo parágrafo, equivale semântica e logicamente a:",
            hint: "'Conquanto' é uma conjunção subordinativa concessiva clássica da Língua Portuguesa.",
            options: [
              {
                id: "A",
                text: "'Visto que' (causa).",
                isCorrect: false,
                feedback: "⚠️ 'Visto que' exprime causa/motivo, não concessão."
              },
              {
                id: "B",
                text: "'Embora' ou 'Ainda que' (concessão).",
                isCorrect: true,
                feedback: "🎯 CONHECIMENTO MORFOSSINTÁTICO DE ELITE! 'Conquanto' equivale a 'embora/apesar de que'. Ela introduz uma ideia que é admitida, mas não impede a complicação seguinte."
              },
              {
                id: "C",
                text: "'Logo que' (tempo).",
                isCorrect: false,
                feedback: "⚠️ 'Logo que' exprime tempo/imediatismo."
              },
              {
                id: "D",
                text: "'Para que' (finalidade).",
                isCorrect: false,
                feedback: "⚠️ 'Para que' exprime objetivo/finalidade."
              }
            ]
          }
        ]
      },
      {
        id: "case_5_2",
        title: "Caso 502: O Testemunho do Mordomo Confuso",
        category: "Coesão Referencial & Anáfora (Rastro dos Pronomes)",
        difficulty: "Intermediário",
        xp: 180,
        textIntro: "O Mordomo Nestor prestou depoimento após a confusão na biblioteca entre o Conde e o Médico. O texto está cheio de pronomes ('este', 'aquele', 'o qual', 'ele'). Quem lê sem atenção troca quem agrediu quem!",
        text: `Nestor declarou: 'Vi quando o Conde Ernesto e o Doutor Gustavo entraram discutindo na sala. Aquele segurava uma bengala de jacarandá; este trazia na mão esquerda uma seringa com líquido turvo.

Repentinamente, o médico avançou em direção à estante. O conde tentou contê-lo com a mão direita, mas este perdeu o equilíbrio e caiu sobre o tapete persa. Ao vê-lo no chão desamparado, ele ergueu a bengala não para agredi-lo, mas para afastar a ponta da agulha que ameaçava perfurar seu próprio braço.'`,
        clues: [
          "Regra gramatical de ouro da coesão: 'Aquele' retoma o primeiro citado (o mais distante: o Conde Ernesto). 'Este' retoma o último citado (o mais próximo: o Doutor Gustavo).",
          "Acompanhe o fio da meada: quem caiu no chão? Quem ergueu a bengala? E por qual motivo?"
        ],
        questions: [
          {
            id: "q_5_2_1",
            question: "No trecho 'Aquele segurava uma bengala de jacarandá; este trazia na mão esquerda uma seringa...', os pronomes 'Aquele' e 'este' referem-se, respectivamente, a:",
            hint: "Lembre-se da referência anafórica: 'Aquele' = o primeiro citado (mais distante); 'Este' = o último citado (mais próximo).",
            options: [
              {
                id: "A",
                text: "Ao Doutor Gustavo e ao Mordomo Nestor.",
                isCorrect: false,
                feedback: "⚠️ O mordomo é o narrador em primeira pessoa ('Vi quando...')."
              },
              {
                id: "B",
                text: "Ao Conde Ernesto e ao Doutor Gustavo.",
                isCorrect: true,
                feedback: "🎯 PRECISÃO CIRÚRGICA DE COESÃO! Em textos formais e literários, 'aquele' recupera o primeiro termo nomeado (Conde Ernesto), enquanto 'este' recupera o último citado antes do ponto (Doutor Gustavo)."
              },
              {
                id: "C",
                text: "Ao Doutor Gustavo e ao Conde Ernesto (ordem inversa).",
                isCorrect: false,
                feedback: "⚠️ INVERSÃO DE PRONOMES: Se fosse o inverso, a seringa estaria com o Conde, o que distorce a narrativa."
              },
              {
                id: "D",
                text: "Aos dois policiais que aguardavam no jardim.",
                isCorrect: false,
                feedback: "⚠️ NÃO EXISTEM POLICIAIS NA FRASE."
              }
            ]
          },
          {
            id: "q_5_2_2",
            question: "Ao final do depoimento, a atitude de erguer a bengala teve como objetivo real:",
            hint: "O texto diz explicitamente: 'não para agredi-lo, mas para...'",
            options: [
              {
                id: "A",
                text: "Espancar o homem caído para roubar a fórmula do remédio.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO COM O TEXTO! O texto afirma com todas as letras: 'não para agredi-lo'."
              },
              {
                id: "B",
                text: "Autodefesa preventiva para desviar o perigo da ponta da agulha que ameaçava seu braço.",
                isCorrect: true,
                feedback: "🎯 EXCELENTE! A conjunção correlativa 'não... mas sim...' esclarece a intenção de proteger-se contra a seringa."
              },
              {
                id: "C",
                text: "Apontar para o teto para chamar a atenção dos bombeiros.",
                isCorrect: false,
                feedback: "⚠️ INVENTADO."
              },
              {
                id: "D",
                text: "Quebrar o tapete persa em dois pedaços iguais.",
                isCorrect: false,
                feedback: "⚠️ SEM NENHUM SENTIDO."
              }
            ]
          }
        ]
      },
      {
        id: "case_5_boss",
        title: "⚡ Desafio de Chefe: A Reconstrução da Carta Rasgada",
        category: "Coesão Lógica Interparágrafos & Conectivos de Transição",
        difficulty: "Avançado",
        xp: 290,
        isBoss: true,
        textIntro: "Os espiões da Agência recuperaram três fragmentos soltos de uma carta confidencial do Almirante. As partes foram encontradas fora de ordem. Sua missão é descobrir qual é a sequência cronológica e lógica correta usando os conectivos como ímãs!",
        text: `FRAGMENTO [1]:
'Por conseguinte, determinei que toda a esquadra recolha as âncoras e navegue rumo ao estreito antes do alvorecer, na expectativa de surpreender o adversário enquanto a névoa nos protege.'

FRAGMENTO [2]:
'Apesar de os batedores terem alertado sobre ventos desfavoráveis e recifes traiçoeiros ao longo da costa rochosa, as informações colhidas pelo serviço secreto confirmam que o porto inimigo permanece completamente desguarnecido nesta madrugada.'

FRAGMENTO [3]:
'Nosso plano inicial dependia do apoio das frotas aliadas do norte. Todavia, a recusa inesperada do rei em enviar os reforços prometidos obrigou-nos a uma mudança drástica de estratégia.'`,
        clues: [
          "Procure o fragmento que apresenta a SITUAÇÃO INICIAL e o problema que deflagrou a mudança (qual deles fala do 'plano inicial' e da 'mudança de estratégia'?).",
          "Depois, procure o fragmento que avalia a SITUAÇÃO ATUAL com 'Apesar de...' (pesando prós e contras da costa desguarnecida).",
          "Por fim, qual conectivo fecha e resume a DECISÃO FINAL da frota ('Por conseguinte...')?"
        ],
        questions: [
          {
            id: "q_5_boss_1",
            question: "A sequência textual que estabelece a ordem lógica e coesa de pensamento do Almirante é:",
            hint: "Primeiro a causa/problema inicial -> depois a análise do cenário atual -> por fim a ordem de ação resultante.",
            options: [
              {
                id: "A",
                text: "[1] -> [2] -> [3]",
                isCorrect: false,
                feedback: "⚠️ ILÓGICO: Começar com 'Por conseguinte' (conclusão) não faz sentido sem as premissas anteriores!"
              },
              {
                id: "B",
                text: "[3] -> [2] -> [1]",
                isCorrect: true,
                feedback: "🏆 CHEFE DERROTADO! GENIALIDADE PURA! [3] Apresenta o plano inicial e a mudança forçada pela quebra da aliança ('Todavia...'). Em [2], avalia a oportunidade imediata mesmo com riscos ('Apesar de...'). Em [1], arremata a ordem de zarpar com a conjunção conclusiva ('Por conseguinte...'). Perfeito!"
              },
              {
                id: "C",
                text: "[2] -> [1] -> [3]",
                isCorrect: false,
                feedback: "⚠️ DESCONEXO: Deixar a justificativa da recusa de reforços [3] para o final quebra a causalidade da ordem de partir [1]."
              },
              {
                id: "D",
                text: "[2] -> [3] -> [1]",
                isCorrect: false,
                feedback: "⚠️ A mudança drástica [3] decorre da falta de aliados e deve anteceder a avaliação tática de risco de [2]."
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // OPERAÇÃO 6: DECIFRADORA SUPREMA (Gêneros, Intertextualidade & Arquivo Ômega)
  // -------------------------------------------------------------
  {
    id: "op6",
    number: 6,
    title: "Decifradora Suprema",
    subtitle: "Intertextualidade, Tipologias Textuais e o Arquivo Ômega",
    description: "Você chegou à prova suprema da Agência. Aqui, textos de gêneros diferentes conversam entre si, dialogam com fábulas e mitos antigos, e desafiam até os leitores mais experientes. Mostre que nenhuma entrelinha escapa do seu olhar!",
    themeColor: "#ffd700",
    cases: [
      {
        id: "case_6_1",
        title: "Caso 601: O Eco dos Clássicos no Ano 2140",
        category: "Intertextualidade & Releitura Crítica",
        difficulty: "Avançado",
        xp: 200,
        textIntro: "O autor distópico Gabriel Rios publicou uma crônica no futuro sobre a convivência entre humanos e robôs na colônia de Marte. Todo o texto estabelece um diálogo implícito com uma das fábulas mais famosas da humanidade.",
        text: `Durante todo o escaldante e interminável verão marciano, a Unidade Androide K-90 operou sem pausa de recarga, perfurando as jazidas de silício, acumulando tanques de oxigênio criogênico e empilhando pastilhas de nutrientes nos silos subterrâneos da cúpula.

Enquanto isso, os colonos biológicos passavam as tardes nos salões de entretenimento holográfico, compondo músicas quânticas, recitando versos em redes neurais e cantando sob as luzes estroboscópicas. 'Para que tanta pressa em perfurar pedras?', zombavam eles pela escotilha de vidro. 'A vida na cúpula é arte e deleite!'

Quando a tempestade solar de inverno rompeu as conexões externas e a temperatura despencou a noventa graus negativos, os colonos bateram às portas reforçadas do silo de K-90, com os lábios roxos de frio e as mãos trêmulas de fome. O androide fitou-os pelas lentes frias de seus sensores ópticos e transmitiu pelo alto-falante apenas uma mensagem gravada nos arquivos de Esopo: 'Cantastes no verão? Pois agora, dançai no gelo.'`,
        clues: [
          "Preste atenção na última frase: 'Cantastes no verão? Pois agora, dançai no gelo'. De onde você já ouviu essa moral?",
          "Quem trabalha o tempo todo acumulando mantimentos enquanto outro só canta e se diverte? É a fábula de A Cigarra e a Formiga!"
        ],
        questions: [
          {
            id: "q_6_1_1",
            question: "O conto futurista constrói seu sentido principal por meio da INTERTEXTUALIDADE com qual narrativa clássica?",
            hint: "Uma fábula infantil universal sobre o dever do trabalho versus a imprudência de quem apenas se diverte.",
            options: [
              {
                id: "A",
                text: "A Lebre e a Tartaruga, mostrando que quem corre devagar chega na frente em Marte.",
                isCorrect: false,
                feedback: "⚠️ FÁBULA ERRADA: O foco não é velocidade de corrida, mas armazenar comida durante o verão."
              },
              {
                id: "B",
                text: "A Cigarra e a Formiga, na qual o androide assume o papel da formiga previdente e os colonos encarnam a cigarra imprudente voltada apenas ao lazer.",
                isCorrect: true,
                feedback: "🎯 RECONHECIMENTO INTERTEXTUAL MAGISTRAL! Gabriel Rios resgatou a clássica fábula de Esopo/La Fontaine, adaptando a formiga para um androide trabalhador e a cigarra para os colonos hedonistas que desprezam o preparo para o inverno."
              },
              {
                id: "C",
                text: "Chapeuzinho Vermelho e o Lobo Mau nas florestas de pinheiros.",
                isCorrect: false,
                feedback: "⚠️ NÃO TEM NADA A VER COM O TEXTO."
              },
              {
                id: "D",
                text: "O Patinho Feio que se transformou em cisne mecânico de silício.",
                isCorrect: false,
                feedback: "⚠️ TOTALMENTE DESCONEXO."
              }
            ]
          },
          {
            id: "q_6_1_2",
            question: "Ao analisar a crítica social implícita no texto, o autor sugere que:",
            hint: "O que acontece com uma sociedade que consome e deleita sem se preocupar com o trabalho de manutenção da própria existência?",
            options: [
              {
                id: "A",
                text: "A humanidade corre o risco de sucumbir caso terceirize toda a responsabilidade de sobrevivência básica e ignore os limites da realidade prática.",
                isCorrect: true,
                feedback: "🎯 REFLEXÃO CRÍTICA AVANÇADA! A crítica atinge o comodismo humano em depender cegamente do esforço autômato sem qualquer senso de planejamento ou respeito ao esforço necessário para sustentar a vida."
              },
              {
                id: "B",
                text: "Robôs são criaturas afetuosas e caridosas que sempre abrem portas no inverno.",
                isCorrect: false,
                feedback: "⚠️ CONTRADIÇÃO: O robô recusou abrigo e ironizou os colonos com a citação de Esopo."
              },
              {
                id: "C",
                text: "Músicas quânticas são a única coisa capaz de aquecer uma tempestade solar.",
                isCorrect: false,
                feedback: "⚠️ ILÓGICO: As músicas não evitaram o congelamento nem a fome."
              },
              {
                id: "D",
                text: "Todos os humanos devem ser proibidos de pintar quadros e cantar para sempre.",
                isCorrect: false,
                feedback: "⚠️ EXTREMISMO SEM FUNDAMENTO NO TEXTO."
              }
            ]
          }
        ]
      },
      {
        id: "case_6_2",
        title: "Caso 602: A Disputa das Quatro Tipologias",
        category: "Tipologias e Gêneros Textuais",
        difficulty: "Avançado",
        xp: 220,
        textIntro: "O Ministério da Cidade emitiu diferentes comunicações sobre a mesma chuva torrencial de ontem. Cada texto foi escrito com um objetivo comunicativo e estrutura completamente diferentes: Narrativa, Dissertativa-Argumentativa e Instrucional.",
        text: `TEXTO I:
'A água subia sem trégua pelas calçadas enquanto dona Laura apertava a foto do marido contra o peito. Ela olhou para o teto de zinco que ameaçava ceder sob o peso das biqueiras e rezou como nunca antes rezara na vida.'

TEXTO II:
'O colapso crônico da macrodrenagem urbana decorre fundamentalmente da impermeabilização desordenada do solo e da omissão reiterada do poder público em desassorear os córregos municipais antes do período chuvoso. Torna-se imperativo, portanto, uma reestruturação orçamentária que priorize bacias de amortecimento.'

TEXTO III:
'Em caso de inundação iminente: 1. Desligue imediatamente o disjuntor geral de energia; 2. Coloque documentos em sacos plásticos vedados; 3. Dirija-se imediatamente ao ponto mais alto da edificação; 4. Não tente atravessar enxurradas a pé.'`,
        clues: [
          "Texto I: foca em personagens, tempo, ações sucessivas, emoção -> NARRATIVO.",
          "Texto II: defende uma tese com argumentos lógicos de causa e propõe solução -> DISSERTATIVO-ARGUMENTATIVO.",
          "Texto III: dá ordens, passos numerados, verbos no imperativo -> INSTRUCIONAL / INJUNTIVO."
        ],
        questions: [
          {
            id: "q_6_2_1",
            question: "A respeito das características e finalidades comunicativas dos três textos, é correto afirmar:",
            hint: "Identifique qual texto conta uma história humana, qual debate causas e teses, e qual prescreve comandos de emergência.",
            options: [
              {
                id: "A",
                text: "O Texto I é instrucional, o Texto II é poético e o Texto III é jornalístico.",
                isCorrect: false,
                feedback: "⚠️ ERRO DE CLASSIFICAÇÃO: O Texto I narra uma história, não dá instruções."
              },
              {
                id: "B",
                text: "O Texto I é narrativo (focado na vivência de uma personagem); o Texto II é dissertativo-argumentativo (analisa causas e defende uma solução); e o Texto III é injuntivo/instrucional (fornece regras de conduta práticas).",
                isCorrect: true,
                feedback: "🎯 CLASSIFICAÇÃO IMPECÁVEL! Você dominou a distinção entre os grandes tipos textuais: a arte de contar histórias (narrativo), a arte de convencer/analisar (argumentativo) e a arte de orientar procedimentos (injuntivo)!"
              },
              {
                id: "C",
                text: "Os três textos pertencem à mesma categoria de poemas barrocos de rima rica.",
                isCorrect: false,
                feedback: "⚠️ ABSURDO: Nenhum dos textos é poema nem possui métrica barroca."
              },
              {
                id: "D",
                text: "O Texto II foi escrito para crianças da pré-escola aprenderem a nadar.",
                isCorrect: false,
                feedback: "⚠️ TOTALMENTE DESPROPOSITADO."
              }
            ]
          }
        ]
      },
      {
        id: "case_6_boss",
        title: "👑 GRANDE JULGAMENTO FINAL: O CASO ARQUIVO ÔMEGA",
        category: "Prova Máxima de Decifração da Agência Códice",
        difficulty: "Mestre Supremo",
        xp: 400,
        isBoss: true,
        textIntro: "O líder da 'Sociedade do Ruído', uma organização secreta que lucra espalhando notícias manipuladas e confusão de leitura pelo mundo, enviou o manifesto final aos jornais globais. Este texto longo e multifacetado contém todas as armadilhas possíveis: pressupostos, ironias, dados mascarados e conectivos ardilosos. Resolva o Enigma Ômega para desarticular o plano e alcançar a patente máxima de Mestre dos Decifradores!",
        text: `MANIFESTO DO CÍRCULO DAS SOMBRAS:

A humanidade contemporânea orgulha-se de carregar bibliotecas infinitas nos bolsos, todavia jamais foi tão desprovida de discernimento. Acreditam que acumular dados equivale a compreender a realidade; contudo, quem apenas acumula sem destrinchar as intenções que tecem a teia das palavras é tão cego quanto aquele que fecha os olhos em meio à tempestade.

É com imenso júbilo que parabenizamos os cidadãos por sua comovente facilidade em compartilhar manchetes sem jamais ler o corpo dos textos. Que espetáculo magnífico de eficiência cívica! Graças à sua pressa vertiginosa, bastou-nos alterar um adjetivo numa postagem para fazer com que nações inteiras debatessem sombras de monstros que jamais existiram fora da tinta das nossas telas.

Conquanto alguns teimosos ainda insistam em analisar fontes, verificar conectivos e questionar quem lucra com a mentira, o curso da história já nos pertence. Afinal, a verdade exige o labor paciente do pensamento crítico, ao passo que a mentira oferece o conforto imediato do preconceito confirmado.

Portanto, deixem de lado a fadiga de pensar. Permitam que nós continuemos a escolher por vocês o que devem temer e o que devem aplaudir.`,
        clues: [
          "O autor usa forte ironia no segundo parágrafo: parabeniza as pessoas por não lerem os textos e chama isso de 'magnífico espetáculo de eficiência cívica'.",
          "O texto estabelece uma contraposição brutal entre 'verdade' (que exige reflexão paciente) e a 'mentira' (que oferece conforto rápido para quem tem preguiça mental).",
          "A ideia central é um alerta e uma denúncia provocadora contra a passividade do leitor superficial."
        ],
        questions: [
          {
            id: "q_6_boss_1",
            question: "Ao decifrar o segundo parágrafo ('Que espetáculo magnífico de eficiência cívica...'), a figura de linguagem utilizada e o seu significado real são:",
            hint: "O autor acha mesmo 'magnífico' que as pessoas compartilhem coisas sem ler?",
            options: [
              {
                id: "A",
                text: "Eufemismo, para confortar os cidadãos que leem com lentidão.",
                isCorrect: false,
                feedback: "⚠️ NÃO É EUFEMISMO: Ele não está suavizando uma dor, está zombando abertamente."
              },
              {
                id: "B",
                text: "Ironia/Sarcasmo, utilizada para ridicularizar o comportamento negligente e precipitado de quem dissemina informações baseado apenas em títulos chamativos.",
                isCorrect: true,
                feedback: "🎯 DECODIFICAÇÃO BRILHANTE! Ele elogia falsamente a pressa para escancarar o quão ingênua e manipulável é a pessoa que repassa manchetes sem ler o conteúdo!"
              },
              {
                id: "C",
                text: "Hipérbole médica, tratando da cegueira ocular provocada por telas de celular.",
                isCorrect: false,
                feedback: "⚠️ INTERPRETAÇÃO LITERAL DESVIADA."
              },
              {
                id: "D",
                text: "Metáfora esportiva comparando leitores a maratonistas olímpicos.",
                isCorrect: false,
                feedback: "⚠️ NÃO HÁ MARATONISTAS NO TEXTO."
              }
            ]
          },
          {
            id: "q_6_boss_2",
            question: "Segundo o terceiro parágrafo, qual é a razão fundamental pela qual as notícias falsas e manipulações se espalham com tanta facilidade?",
            hint: "Compare: 'ao passo que a mentira oferece o conforto imediato do preconceito confirmado'.",
            options: [
              {
                id: "A",
                text: "Porque as mentiras bem elaboradas sempre contêm selos oficiais do governo em alta definição.",
                isCorrect: false,
                feedback: "⚠️ O texto não fala sobre selos governamentais."
              },
              {
                id: "B",
                text: "Porque a verdade requer o esforço trabalhoso da análise crítica, enquanto a mentira acolhe a preguiça intelectual confirmando o que a pessoa já queria acreditar sem esforço.",
                isCorrect: true,
                feedback: "👑 VITÓRIA HISTÓRICA! VOCÊ RESOLVEU O CASO ÔMEGA! A tese central do Círculo das Sombras foi desmascarada: a manipulação só funciona porque a verdade exige reflexão ativa, e muitas pessoas preferem o conforto de não pensar. Você provou ser uma MESTRE SUPREMA DA INTERPRETAÇÃO TEXTUAL!"
              },
              {
                id: "C",
                text: "Porque a tinta usada nas impressoras do século XXI é tóxica e apaga as memórias das pessoas.",
                isCorrect: false,
                feedback: "⚠️ TOTALMENTE DELIRANTE."
              },
              {
                id: "D",
                text: "Porque o Círculo das Sombras comprou todas as antenas de satélite do planeta.",
                isCorrect: false,
                feedback: "⚠️ EXTRAPOLAÇÃO SEM BASE NO TEXTO."
              }
            ]
          }
        ]
      }
    ]
  }
];

// BANCO DE MINIGAMES DO DOJÔ DE TREINO RÁPIDO
const MINI_GAMES = {
  factVsOpinion: [
    {
      statement: "A torre Eiffel mede aproximadamente 330 metros de altura com suas antenas.",
      type: "FATO",
      why: "Pode ser medido cientificamente com instrumentos de precisão."
    },
    {
      statement: "Paris é a cidade mais charmosa e aconchegante de todo o continente europeu.",
      type: "OPINIÃO",
      why: "'Charmosa' e 'aconchegante' são impressões subjetivas de gosto pessoal."
    },
    {
      statement: "A água pura entra em ebulição a 100°C ao nível do mar sob pressão de 1 atm.",
      type: "FATO",
      why: "Fenômeno físico-químico verificável e repetível em laboratório."
    },
    {
      statement: "Aquele livro de mistério tem um final completamente sem graça e previsível.",
      type: "OPINIÃO",
      why: "O que é sem graça para um leitor pode ser emocionante para outro."
    },
    {
      statement: "O Brasil conquistou cinco títulos mundiais de futebol masculino até 2022.",
      type: "FATO",
      why: "Dado histórico e documentalmente registrado pela FIFA."
    },
    {
      statement: "O futebol moderno perdeu toda a magia e tornou-se um negócio chato.",
      type: "OPINIÃO",
      why: "Julgamento de valor que depende da nostalgia e do ponto de vista do torcedor."
    },
    {
      statement: "A camada de ozônio protege o planeta contra grande parte dos raios ultravioleta.",
      type: "FATO",
      why: "Comprovado por estudos atmosféricos mundiais com sensores e satélites."
    },
    {
      statement: "O sorvete de pistache é indiscutivelmente superior ao sorvete de chocolate.",
      type: "OPINIÃO",
      why: "Paladar e preferência individual não são verdades universais."
    },
    {
      statement: "O artigo 5º da Constituição Federal assegura a igualdade de todos perante a lei.",
      type: "FATO",
      why: "Texto legal devidamente promulgado e redigido no documento oficial."
    },
    {
      statement: "Aquele comercial de refrigerante foi a peça publicitária mais comovente do ano.",
      type: "OPINIÃO",
      why: "'Comovente' expressa emoção subjetiva sentida por determinados espectadores."
    }
  ],

  connectives: [
    {
      phrase: "O detetive reuniu todas as pistas contra o suspeito, _____ o juiz não concedeu o mandado por falta de provas materiais.",
      options: [
        { word: "porém", correct: true, explain: "Expressa oposição e contraste entre o esforço do detetive e a decisão negativa do juiz." },
        { word: "portanto", correct: false, explain: "Expressaria conclusão lógica, mas o juiz agiu no sentido contrário." },
        { word: "porque", correct: false, explain: "Expressaria causa, o que não faz sentido nessa posição." },
        { word: "conforme", correct: false, explain: "Expressaria conformidade, mas houve choque de ações." }
      ]
    },
    {
      phrase: "Ela estudou com afinco as regras de interpretação durante meses; _____, conquistou a maior nota de todo o exame.",
      options: [
        { word: "consequentemente", correct: true, explain: "Indica o resultado natural e lógico da dedicação aos estudos." },
        { word: "todavia", correct: false, explain: "Indicaria que algo deu errado, mas ela tirou a maior nota!" },
        { word: "embora", correct: false, explain: "Inicia oração concessiva subordinada, quebrando a pontuação." },
        { word: "já que", correct: false, explain: "Expressaria justificativa causal, invertendo o fluxo da frase." }
      ]
    },
    {
      phrase: "_____ a chuva tenha inundado o acesso à biblioteca, a leitora insistiu em buscar as obras raras.",
      options: [
        { word: "Embora", correct: true, explain: "Conectivo concessivo: admite o obstáculo (chuva), mas não impede a ação principal." },
        { word: "Logo", correct: false, explain: "Conectivo conclusivo, inadequado no início dessa estrutura." },
        { word: "Contudo", correct: false, explain: "Conjunção adversativa que não pode iniciar esse tipo de período sem oração anterior." },
        { word: "Assim", correct: false, explain: "Inadequado sintaticamente com o verbo no subjuntivo 'tenha inundado'." }
      ]
    },
    {
      phrase: "Não compareceu à reunião com a equipe _____ estava em missão sigilosa em outra cidade.",
      options: [
        { word: "porque", correct: true, explain: "Introduz a justificativa e causa da ausência na reunião." },
        { word: "porém", correct: false, explain: "Indica oposição, quando o que se quer é a explicação." },
        { word: "portanto", correct: false, explain: "Indica conclusão, que estaria no lugar inverso." },
        { word: "contudo", correct: false, explain: "Não funciona como explicativo causal." }
      ]
    }
  ],

  ironyRadar: [
    {
      context: "Após bater o dedinho na quina da cômoda de madeira pela terceira vez no mesmo dia, o homem exclamou:",
      phrase: "— Que maravilha de dia abençoado! Era exatamente dessa massagem no pé que eu estava precisando!",
      isIrony: true,
      why: "Ele usou 'maravilha' e 'massagem' para expressar o exato oposto da dor e da frustração."
    },
    {
      context: "O médico examinou os exames de sangue do paciente e disse com tom calmo:",
      phrase: "— Seus índices de colesterol e glicose estão perfeitamente normais. O senhor está de parabéns pela saúde.",
      isIrony: false,
      why: "Trata-se de uma constatação literal e sincera baseada em dados laboratoriais."
    },
    {
      context: "O aluno entregou a redação com apenas duas linhas rabiscadas após quatro horas de prova. O professor comentou:",
      phrase: "— Vejo que você quase escreveu a enciclopédia inteira de tanto detalhe que colocou aqui.",
      isIrony: true,
      why: "Chamar duas linhas de 'enciclopédia' é uma ironia com hipérbole sarcástica para destacar a preguiça."
    },
    {
      context: "A mãe abre a janela do quarto às 6h da manhã durante uma tempestade de granizo e diz ao filho sonolento:",
      phrase: "— Acorde rápido, querido! Que tempo convidativo para um gostoso piquenique na grama molhada!",
      isIrony: true,
      why: "Ninguém faz piquenique sob chuva de granizo; a fala zomba da situação climática hostil."
    },
    {
      context: "O guia turístico aponta para a montanha nevada e instrui o grupo:",
      phrase: "— Recomendo colocarem os casacos térmicos, pois a temperatura no topo está em três graus abaixo de zero.",
      isIrony: false,
      why: "Aviso literal de segurança preventiva sem duplo sentido."
    }
  ]
};

// ARSENAL DE COMBATE: GLOSSÁRIO DIDÁTICO ESTRATÉGICO
const ARSENAL_GUIDE = [
  {
    title: "1. A Regra de Ouro: Compreensão vs. Interpretação",
    icon: "🎯",
    color: "#00f2fe",
    summary: "Não confunda achar uma frase escrita com deduzir o que o autor quis dizer!",
    points: [
      "<strong>Compreensão:</strong> É o que está ESCRITO com todas as letras (explícito no texto). O comando da questão costuma dizer: <em>'Segundo o texto...'</em> ou <em>'O autor afirma que...'</em>.",
      "<strong>Interpretação:</strong> É o que você DEDUZ a partir das pistas (implícito nas entrelinhas). O comando costuma dizer: <em>'Infere-se do texto que...'</em>, <em>'Conclui-se que...'</em>.",
      "<strong>A Regra Sagrada:</strong> Nunca invente coisas da sua cabeça que o texto não autoriza! A interpretação precisa de pistas sólidas deixadas pelo autor."
    ]
  },
  {
    title: "2. As 3 Armadilhas Fatais da Leitura",
    icon: "⚠️",
    color: "#ff76ac",
    summary: "Os 3 erros clássicos que fazem quase todo mundo errar questões:",
    points: [
      "<strong>1. Extrapolação (Inventar moda):</strong> Você viaja na maionese e traz conhecimentos externos ou opiniões suas que o texto NUNCA mencionou.",
      "<strong>2. Redução (Enxergar pequeno):</strong> A alternativa foca em apenas uma frase boba ou detalhe isolado e ignora o todo do texto.",
      "<strong>3. Contradição (Trocar as bolas):</strong> A alternativa diz exatamente o oposto do que o autor defendeu, muitas vezes trocando um 'não' ou confundindo quem fez o quê."
    ]
  },
  {
    title: "3. A Gangue dos Conectivos Chave",
    icon: "🌉",
    color: "#4facfe",
    summary: "As palavras que viram o rumo de qualquer argumento:",
    points: [
      "<strong>Adversativos (A Virada de Mesa):</strong> <em>Mas, porém, contudo, todavia, no entanto.</em> Indicam que a ideia mais importante vem DEPOIS deles!",
      "<strong>Concessivos (O Obstáculo Vencido):</strong> <em>Embora, ainda que, conquanto, mesmo que.</em> Indicam uma barreira que não impediu o fato.",
      "<strong>Conclusivos (O Veredito Final):</strong> <em>Portanto, logo, por conseguinte, por isso.</em> Fecham o raciocínio com uma consequência direta.",
      "<strong>Causais (O Porquê da Coisa):</strong> <em>Porque, visto que, já que, como (no início).</em> Apontam o motivo ou razão geradora."
    ]
  },
  {
    title: "4. Radar de Figuras de Linguagem",
    icon: "🎭",
    color: "#a18cd1",
    summary: "Quando o autor usa máscaras poéticas para enriquecer a mensagem:",
    points: [
      "<strong>Ironia:</strong> Dizer o oposto do que pensa com tom sarcástico (ex: <em>'Parabéns pela nota zero, gênio!'</em>).",
      "<strong>Metáfora:</strong> Uma comparação implícita e poética (ex: <em>'O tempo é um rio veloz'</em>).",
      "<strong>Metonímia:</strong> Trocar a parte pelo todo ou o autor pela obra (ex: <em>'Li Machado de Assis'</em> = li o livro dele).",
      "<strong>Hipérbole:</strong> Exagero intencional dramático (ex: <em>'Já pedi um milhão de vezes'</em>).",
      "<strong>Eufemismo:</strong> Suavizar algo desagradável ou pesado (ex: <em>'Ele partiu desta para melhor'</em> = faleceu)."
    ]
  },
  {
    title: "5. A Técnica do Semáforo para Ler Textos Difíceis",
    icon: "🚦",
    color: "#f6d365",
    summary: "Como ler qualquer texto longo sem se perder no caminho:",
    points: [
      "<strong>🟢 Luz Verde (Primeira Leitura Corrida):</strong> Leia o texto inteiro sem parar, do início ao fim, só para saber de que assunto geral ele trata.",
      "<strong>🟡 Luz Amarela (Leia as Perguntas):</strong> Antes da segunda leitura, olhe o que a pergunta está cobrando! Assim, seus olhos já sabem o que caçar.",
      "<strong>🔴 Luz Vermelha (Leitura com Lupa/Grifo):</strong> Volte ao texto com o marcador na mão, caçando exatamente o parágrafo onde está a evidência da resposta."
    ]
  }
];
