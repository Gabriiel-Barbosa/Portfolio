// Projetos do site. Para incluir um projeto, acrescente um item em PROJETOS.
// A home mostra os três primeiros de cada categoria, nesta ordem: o primeiro é o card grande.
// Os filtros e as tags são montados a partir de tipos, tecnologias, setores, areas e competencias.
// Essas listas não podem ter vírgula no texto, porque ela separa os valores no endereço.
// Campos sem conteúdo real ficam como null e aparecem na página como espaço marcado.
// Em telas, "larga" abre a imagem no tamanho real, com rolagem lateral.
// painelAoVivo é o endereço público do dashboard, embutido na página do projeto.
// relacionado é o id de outro projeto, mostrado como link na ficha lateral.
const CATEGORIAS = [
  { id: "gestao", nome: "Gestão, Planejamento e Estratégia" },
  { id: "bi", nome: "Inteligência de Negócios e Indicadores" },
  { id: "processos", nome: "Processos e Eficiência Operacional" },
  { id: "tecnologia", nome: "Tecnologia, Automação e Soluções Digitais" }
];

const PASTA_CONTRATOS = "assets/img/projetos/gestao-de-contratos";
const PASTA_DASHBOARD = "assets/img/projetos/dashboard-de-contratos";

const PROJETOS = [
  {
    id: "gestao-de-contratos",
    nome: "Gestão de Contratos",
    categoria: "gestao",
    natureza: "Estudo de caso com dados fictícios",
    tipos: ["Planilhas e controles"],
    tecnologias: ["Excel"],
    setores: ["Facilities", "Serviços terceirizados"],
    areas: ["Gestão de Contratos", "Comercial", "Financeiro", "Operações", "Diretoria"],
    competencias: ["Gestão de contratos", "Planejamento e controle", "Análise financeira e de custos", "Gestão de riscos", "Pipeline comercial", "Indicadores", "Melhoria de processos"],
    recursos: ["36 tabelas", "SOMASES", "ÍNDICE e CORRESP", "UNIRTEXTO", "Validação de dados", "Formatação condicional", "Proteção de abas"],
    papel: "Concepção e modelagem do controle",
    relacionado: "dashboard-de-contratos",
    resumo: "Controle em Excel que reúne a carteira de contratos de uma empresa de facilities fictícia, da oportunidade comercial à renovação.",
    frase: "Uma visão única da carteira de contratos, para decidir antes do vencimento.",
    numeros: [
      { valor: "15", rotulo: "perguntas de gestão" },
      { valor: "16", rotulo: "abas integradas" },
      { valor: "33 de 33", rotulo: "conferências em ordem" }
    ],
    print: `${PASTA_CONTRATOS}/capa.webp`,
    link: "https://github.com/Gabriiel-Barbosa/contratos_vertice_facilities",
    pendente: null,
    historia: [
      { titulo: "O desafio", texto: "Cada área mantinha seu próprio controle, e a diretoria não tinha uma visão única de receita, margem, vencimentos, reajustes e perdas." },
      { titulo: "A estratégia", texto: "Parti de 15 perguntas de gestão, acompanhei o ciclo completo do contrato e separei o registro de cada área da leitura no painel." },
      { titulo: "A solução", texto: "Controle em Excel com painel para a reunião mensal, bases por etapa, DRE gerencial, agenda de renovações e alertas que explicam o motivo de cada exceção." },
      { titulo: "O que revelou no cenário simulado", texto: "Em 16 contratos e R$ 704.300 de receita mensal, apontou um contrato abaixo da margem mínima, quatro datas-base sem pedido de reajuste e três contratos com plano de ação indicado." }
    ],
    desafio: {
      titulo: "Decisões sem uma visão única",
      texto: "A Vértice Facilities, empresa fictícia de Salvador, presta serviços de limpeza, portaria, vigilância, jardinagem, manutenção predial e apoio operacional a clientes públicos e privados. Quando a carteira cresceu, cada área passou a manter seu próprio controle.",
      perguntasTitulo: "O que a diretoria tinha dificuldade para responder",
      perguntas: [
        "Quanto temos contratado e com qual margem?",
        "O que vence nos próximos meses, e quem está decidindo?",
        "Quais reajustes deixamos de pedir?",
        "Por que perdemos os contratos que perdemos?",
        "Quanta receita futura existe no comercial?"
      ],
      consequencias: "Renovação em cima do prazo, reajuste não pedido na data, contrato que fatura bem e rende pouco e perdas que não geravam aprendizado."
    },
    estrategia: {
      titulo: "Começar pelas decisões, não pelos dados",
      frentes: [
        { titulo: "Perguntas primeiro", texto: "Defini 15 perguntas que a gestão precisa responder e só depois os campos necessários." },
        { titulo: "Ciclo completo", texto: "O contrato não começa na assinatura nem termina no vencimento." },
        { titulo: "Registro separado da leitura", texto: "Cada área mantém sua base, e o painel consolida o que importa para a reunião mensal." },
        { titulo: "Gestão por exceção", texto: "Em vez de exibir tudo, o painel destaca o que saiu do esperado e explica o motivo." }
      ],
      ciclo: ["Prospecção", "Proposta", "Contratação", "Execução", "Reajuste", "Renovação", "Encerramento"],
      criterios: [
        "Reajuste só entra na receita depois de formalizado.",
        "Oportunidade não compõe a carteira contratada.",
        "Renovação tem marcos em 180, 120, 90, 60 e 30 dias.",
        "Com três sinais de atenção, o contrato exige plano de ação da diretoria."
      ]
    },
    solucao: {
      titulo: "Um controle para a reunião mensal",
      componentes: [
        { titulo: "Painel gerencial", texto: "Indicadores, prioridades do mês escritas a partir dos dados, DRE até a margem de contribuição e agenda de vencimentos." },
        { titulo: "Bases por etapa", texto: "Contratos, itens, financeiro, reajustes, obrigações e SLA, riscos, renovações, oportunidades e encerrados." },
        { titulo: "Parâmetros e conferências", texto: "Limites ajustáveis sem mexer nas fórmulas e verificação dos totais." }
      ]
    },
    telas: [
      { arquivo: `${PASTA_CONTRATOS}/01_painel_completo.webp`, titulo: "Painel gerencial completo", descricao: "Tela de abertura, desenhada para conduzir a reunião mensal sem navegar pelas bases.", temas: ["Visão gerencial"] },
      { arquivo: `${PASTA_CONTRATOS}/02_painel_topo_dre.webp`, titulo: "Indicadores, prioridades e DRE", descricao: "Contratos, receita, margem, vencimentos, reajustes e pipeline, com as decisões do mês e o DRE gerencial.", temas: ["Visão gerencial", "Financeiro"] },
      { arquivo: `${PASTA_CONTRATOS}/03_painel_atencao_riscos.webp`, titulo: "Atenção, renovações e riscos", descricao: "Ranking de contratos em atenção com o motivo do alerta, próximos compromissos, matriz de riscos, perdas e conversão.", temas: ["Visão gerencial", "Riscos", "Comercial"] },
      { arquivo: `${PASTA_CONTRATOS}/04_contratos.webp`, titulo: "Carteira de contratos", descricao: "Um registro por contrato, com sinais automáticos de vencimento, margem, reajuste e plano de ação.", temas: ["Contratos"], larga: true },
      { arquivo: `${PASTA_CONTRATOS}/05_itens.webp`, titulo: "Composição dos contratos", descricao: "Postos, quantidades, preços e custos. A soma dos itens precisa fechar com o valor do contrato.", temas: ["Contratos", "Financeiro"], larga: true },
      { arquivo: `${PASTA_CONTRATOS}/06_financeiro.webp`, titulo: "Financeiro mensal", descricao: "Previsto, faturado e recebido por competência, com a glosa visível na margem.", temas: ["Financeiro"], larga: true },
      { arquivo: `${PASTA_CONTRATOS}/07_reajustes.webp`, titulo: "Reajustes e aditivos", descricao: "Data-base, percentual, pedido e formalização, com estimativa do retroativo em aberto.", temas: ["Contratos", "Financeiro"], larga: true },
      { arquivo: `${PASTA_CONTRATOS}/08_obrigacoes.webp`, titulo: "Obrigações e SLA", descricao: "Obrigações por tipo, com responsável, prazo e evidência.", temas: ["Contratos", "Riscos"] },
      { arquivo: `${PASTA_CONTRATOS}/09_ocorrencias_riscos.webp`, titulo: "Ocorrências e riscos", descricao: "Desvios e riscos com severidade calculada, plano de ação, responsável e impacto financeiro.", temas: ["Riscos"], larga: true },
      { arquivo: `${PASTA_CONTRATOS}/10_renovacoes.webp`, titulo: "Renovações", descricao: "Marcos de cada contrato e indicação do momento da decisão.", temas: ["Contratos"], larga: true },
      { arquivo: `${PASTA_CONTRATOS}/11_oportunidades.webp`, titulo: "Oportunidades e BIDs", descricao: "Funil padronizado, com probabilidade, prazos, margem prevista e alertas.", temas: ["Comercial"], larga: true },
      { arquivo: `${PASTA_CONTRATOS}/12_encerrados.webp`, titulo: "Contratos encerrados", descricao: "Histórico com motivos padronizados, para transformar perda em aprendizado.", temas: ["Comercial", "Contratos"], larga: true },
      { arquivo: `${PASTA_CONTRATOS}/13_indicadores.webp`, titulo: "Indicadores e conferências", descricao: "Memória de cálculo e comparação do controle com os valores de referência.", temas: ["Governança"] },
      { arquivo: `${PASTA_CONTRATOS}/14_parametros.webp`, titulo: "Parâmetros de gestão", descricao: "Limites em um só lugar, ajustáveis sem mexer nas fórmulas.", temas: ["Governança"] }
    ],
    impacto: {
      titulo: "O que o controle revelou no cenário simulado",
      aviso: "Valores simulados, na data-base de 01/11/2026. Não representam resultados de uma empresa real.",
      leituras: [
        { valor: "R$ 704.300", rotulo: "de receita mensal em 16 contratos vigentes" },
        { valor: "8%", rotulo: "de margem em um contrato, abaixo do mínimo de 10%" },
        { valor: "R$ 80.602", rotulo: "de retroativo estimado, com quatro datas-base sem pedido" },
        { valor: "3", rotulo: "contratos com plano de ação indicado" }
      ],
      limites: "Não substitui o ERP nem o arquivo oficial dos contratos assinados. Edição simultânea, controle de acesso e trilha de auditoria são limitados.",
      proximoPasso: `Continua no <a href="projeto.html?id=dashboard-de-contratos">Dashboard de Gestão de Contratos</a>.`
    }
  },
  {
    id: "dashboard-de-contratos",
    nome: "Dashboard de Gestão de Contratos",
    categoria: "bi",
    natureza: "Estudo de caso com dados fictícios",
    tipos: ["Dashboards e BI"],
    tecnologias: ["Power BI", "Power Query", "DAX", "TMDL", "Git"],
    setores: ["Facilities", "Serviços terceirizados"],
    areas: ["Gestão de Contratos", "Comercial", "Financeiro", "Diretoria"],
    competencias: ["Modelagem dimensional", "Indicadores", "Design de relatórios", "Análise financeira e de custos", "Gestão de riscos"],
    recursos: ["Modelo em estrela", "174 medidas", "Filtros sincronizados", "Tooltips de página", "Projeto .pbip"],
    papel: "Concepção e modelagem do dashboard",
    relacionado: "gestao-de-contratos",
    resumo: "Dashboard em Power BI da carteira de contratos de uma empresa de facilities fictícia, da oportunidade comercial ao encerramento.",
    frase: "O que está contratado, o que vence e o que deixou de ser cobrado, em uma só leitura.",
    numeros: [
      { valor: "6", rotulo: "telas" },
      { valor: "174", rotulo: "medidas DAX" },
      { valor: "43 de 43", rotulo: "indicadores conferidos com o Excel" }
    ],
    print: `${PASTA_DASHBOARD}/capa.webp`,
    link: "https://github.com/Gabriiel-Barbosa/contratos_vertice_facilities_Dashboard",
    painelAoVivo: "https://app.powerbi.com/view?r=eyJrIjoiMmEwMWQ4ODktN2FjZS00ZmNhLWIyNjItZTM0ZGY5YWY0MDIxIiwidCI6IjY1OWNlMmI4LTA3MTQtNDE5OC04YzM4LWRjOWI2MGFhYmI1NyJ9&pageName=visao",
    pendente: null,
    historia: [
      { titulo: "O desafio", texto: "O controle em Excel organizou a carteira, mas é tabular e exige conhecer as abas. A diretoria precisava ver rápido onde decidir." },
      { titulo: "A estratégia", texto: "Parti das mesmas perguntas de negócio e mantive as regras no Excel. Cada tela abre com a pergunta que responde e termina em uma lista de ação." },
      { titulo: "A solução", texto: "Seis telas por assunto, com modelo em estrela, filtros sincronizados e tooltips de contexto." },
      { titulo: "O que revelou no cenário simulado", texto: "Cinco clientes concentram 60,50% da receita, 36,09% dela vence em 180 dias, e três contratos com três sinais de atenção somam 23,6% da receita." }
    ],
    desafio: {
      titulo: "Do controle à leitura rápida",
      texto: "O controle em Excel da Vértice Facilities, empresa fictícia, organizou a carteira e padronizou as regras, mas foi desenhado para a reunião mensal: é tabular e exige conhecer as abas.",
      perguntasTitulo: "O que cada tela responde",
      perguntas: [
        "Quanto temos contratado, com qual margem, e o que exige decisão agora?",
        "Quais contratos sustentam a margem e quais estão abaixo do limite?",
        "O que vence, quanto está em risco e quem precisa decidir?",
        "Quanto deixamos de cobrar e quais riscos precisam de resposta?",
        "Quanta receita futura existe e o que fazer nos próximos dias?",
        "Quanto perdemos, por quê e o que muda para não repetir?"
      ],
      consequencias: "Sem uma camada visual, enxergar o que está contratado, o que vence e o que deixou de ser cobrado exigia percorrer as abas."
    },
    estrategia: {
      titulo: "Mesmas perguntas, uma leitura visual",
      frentes: [
        { titulo: "Pergunta e ação", texto: "Cada tela abre com a pergunta que responde e termina em uma lista de ação, com responsável e prazo." },
        { titulo: "Fonte única das regras", texto: "Faixas de vigência, sinais de atenção e severidade continuam no Excel. O DAX agrega, sem duplicar a lógica." },
        { titulo: "Dimensão única de contrato", texto: "Vigentes, encerrados e a oportunidade com risco registrado respondem aos mesmos filtros." },
        { titulo: "Data-base controlada", texto: "Os prazos seguem um parâmetro, nunca a data do computador." }
      ],
      criterios: [
        "Margem de contribuição não é lucro.",
        "Receita contratada não é faturamento nem recebimento.",
        "Pipeline não compõe a carteira, e nominal e ponderado aparecem separados.",
        "Reajuste projetado não altera a receita antes de formalizado.",
        "Valores mensais, anuais e globais não são somados entre si."
      ]
    },
    solucao: {
      titulo: "Seis telas para decidir",
      componentes: [
        { titulo: "Navegação por assunto", texto: "Barra lateral com as seis telas, e Segmento e Cliente acompanham o usuário em todas elas." },
        { titulo: "Modelo em estrela", texto: "Cinco dimensões e nove fatos, carregados das Tabelas do Excel pelo Power Query, com filtro em direção única." },
        { titulo: "Projeto em TMDL", texto: "Salvo em arquivos de texto, para o Git mostrar qual medida ou visual mudou e o modelo ser lido sem abrir o Power BI." },
        { titulo: "Leitura guiada", texto: "Tooltips de contexto, conceito explicado nos cartões e cor com significado: verde para resultado, dourado para atenção e coral para risco." }
      ]
    },
    tituloTelas: "Cada tela do dashboard, por dentro",
    telas: [
      { arquivo: `${PASTA_DASHBOARD}/01_visao_executiva.webp`, titulo: "Visão Executiva", descricao: "Resume a carteira, mostra onde a receita está concentrada e ordena os contratos por pontos de atenção.", temas: ["Visão gerencial"] },
      { arquivo: `${PASTA_DASHBOARD}/02_carteira_margem.webp`, titulo: "Carteira e Margem", descricao: "Compara a margem por contrato com o limite de 10% e separa o previsto, o faturado e o recebido em cada competência.", temas: ["Financeiro", "Contratos"] },
      { arquivo: `${PASTA_DASHBOARD}/03_renovacoes.webp`, titulo: "Vencimentos e Renovações", descricao: "Receita por faixa de vencimento, valor em cada marco de decisão e agenda com próxima ação e responsável.", temas: ["Contratos"] },
      { arquivo: `${PASTA_DASHBOARD}/04_reajustes_riscos.webp`, titulo: "Reajustes e Riscos", descricao: "Reajustes e aditivos em aberto, matriz de probabilidade e impacto, obrigações vencidas e planos de ação.", temas: ["Financeiro", "Riscos"] },
      { arquivo: `${PASTA_DASHBOARD}/05_comercial.webp`, titulo: "Comercial", descricao: "Pipeline nominal e ponderado separados, motivos de perda e oportunidades por prazo.", temas: ["Comercial"] },
      { arquivo: `${PASTA_DASHBOARD}/06_perdas.webp`, titulo: "Perdas", descricao: "Receita perdida por motivo, responsável e trimestre, com o plano para evitar recorrência.", temas: ["Comercial", "Riscos"] }
    ],
    impacto: {
      titulo: "O que o dashboard revelou no cenário simulado",
      aviso: "Valores simulados, na data-base de 01/11/2026. Não representam resultados de uma empresa real.",
      leituras: [
        { valor: "R$ 704.300", rotulo: "de receita mensal em 16 contratos vigentes" },
        { valor: "60,50%", rotulo: "da receita nos cinco maiores clientes" },
        { valor: "R$ 254.200", rotulo: "de receita vencendo em 180 dias" },
        { valor: "23,6%", rotulo: "da receita em três contratos com três sinais de atenção" }
      ]
    }
  },
  {
    id: "controle-de-estoque",
    nome: "Controle de Estoque",
    categoria: "bi",
    tipos: ["Dashboards e BI"],
    tecnologias: ["Power BI", "DAX"],
    setores: [],
    areas: [],
    competencias: [],
    resumo: "Painel que acompanha o que entra e o que sai do estoque ao longo do tempo.",
    print: null, link: null
  }
];
