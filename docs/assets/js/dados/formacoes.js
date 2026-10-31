// Conteúdo dos popups de formação, com base nas páginas oficiais dos cursos.
const FORMACOES = [
  {
    sigla: "MBA", titulo: "MBA em Controladoria e Finanças Corporativas", status: "Em andamento", concluido: false,
    lide: "MBA em gestão financeira estratégica que percorre o ciclo completo de uma empresa: controladoria e governança, planejamento tributário e de custos, orçamento, análise de riscos e investimentos e valuation, para sustentar decisões de gestão.",
    fatos: [["Instituição", "Universidade Salvador"], ["Período", "Jul. 2026 a jul. 2027"], ["Nível", "Pós-graduação"], ["Carga horária", "360 horas"]],
    oQueE: "A controladoria acompanha orçamento, custos e resultados para que a gestão saiba se a empresa está no rumo certo. As finanças corporativas tratam de como usar o capital: onde investir, como financiar e quais riscos aceitar. O MBA junta as duas visões, com foco em planejamento orçamentário e análise de riscos financeiros.",
    tituloEstudos: "O que estudo",
    estudos: [
      ["Controladoria e Governança Corporativa", "Como a controladoria se organiza e apoia a gestão com planejamento e controle.", ["Papel do Controller", "Controle gerencial", "Planejamento estratégico", "Governança corporativa"]],
      ["Planejamento Tributário e de Custos", "Como escolher o regime tributário e apurar o que a operação custa de verdade.", ["Regimes tributários", "Custos diretos e indiretos", "Curva ABC de gastos", "Redução de custos"]],
      ["Budget e Forecast", "Como montar o orçamento e revisar as previsões conforme o cenário muda.", ["Modelos de orçamento", "Fluxo de caixa", "Rolling forecast", "Modelos em planilha"]],
      ["Valuation", "Como estimar quanto uma empresa vale, para vender, investir ou buscar investidores.", ["Fluxo de caixa descontado", "Múltiplos de mercado", "Ativos intangíveis"]]
    ],
    tituloFazer: "O que essa formação prepara para fazer",
    fazer: ["Elaborar orçamentos e previsões", "Analisar a viabilidade de projetos", "Apurar e gerir custos", "Interpretar indicadores econômicos e financeiros"],
    conexao: "No planejamento acadêmico, analiso custos docentes e dimensiono recursos. O MBA me dá a base financeira para ligar esses números ao orçamento e às decisões de gestão."
  },
  {
    sigla: "ADS", titulo: "Análise e Desenvolvimento de Sistemas", status: "Concluído", concluido: true,
    lide: "Graduação tecnológica voltada ao ciclo de vida de um sistema de informação: requisitos, modelagem de dados, programação, testes, implantação e gestão de projetos, para entregar software com qualidade e segurança.",
    fatos: [["Instituições", "IF Baiano e Universidade Salvador"], ["Período", "2020 a 2024"], ["Nível", "Graduação tecnológica"]],
    oQueE: "É a graduação tecnológica da área de software. O curso ensina a levantar o que um sistema precisa fazer, modelar os dados, programar, testar e colocar em operação, com atenção à qualidade, à segurança e à facilidade de uso. Iniciada no IF Baiano, Campus Catu (2020 a 2024), e concluída na Universidade Salvador (2024).",
    tituloEstudos: "O que estudei",
    estudos: [
      ["Programação", "Da lógica à construção de aplicações.", ["Algoritmos", "Estruturas de dados", "Orientação a objetos", "Programação web"]],
      ["Banco de dados", "Como modelar, guardar e consultar informação com consistência.", ["Modelagem de dados", "Bancos de dados"]],
      ["Engenharia de software", "Como planejar um sistema antes de construir e garantir que ele funciona.", ["Análise e projeto de sistemas", "Estimativa e testes", "Interface com o usuário"]],
      ["Gestão de projetos", "Como planejar um projeto de software e acompanhar sua execução.", ["Planejamento e gerência de projetos"]],
      ["Infraestrutura e segurança", "O que sustenta um sistema em funcionamento.", ["Sistemas operacionais", "Redes", "Sistemas distribuídos", "Segurança"]]
    ],
    tituloFazer: "O que essa formação prepara para fazer",
    fazer: ["Levantar e especificar requisitos", "Analisar, projetar e desenvolver sistemas", "Modelar dados e escolher ferramentas", "Gerenciar projetos de software"],
    conexao: "É de onde vem minha base técnica. Modelagem, programação e raciocínio analítico aparecem no que faço com Python, Power Query, Power BI e Power Apps, e sustentaram o site e o aplicativo que criei no estágio em TI."
  },
  {
    sigla: "6σ", titulo: "Six Sigma Green Belt", status: "Concluído", concluido: true,
    lide: "Certificação em Six Sigma voltada à melhoria de processos, que aplica análise de dados da definição do problema à padronização da solução, para reduzir erros e variação.",
    fatos: [["Instituição", "Grupo GPS"], ["Ano", "2024"], ["Nível", "Green Belt"], ["Foco", "GPS Vista"]],
    oQueE: "Six Sigma é uma metodologia de melhoria de processos que usa dados para reduzir erros e variação. O nível Green Belt prepara para aplicar o método e suas ferramentas em projetos de melhoria. Minha certificação teve foco no GPS Vista, ferramenta de gestão do Grupo GPS.",
    tituloMetodo: "Como o método funciona",
    metodo: [
      ["Definir", "Qual é o problema e o que muda ao resolvê-lo."],
      ["Medir", "Como o processo está hoje, em números."],
      ["Analisar", "Qual é a causa raiz, com base nos dados."],
      ["Melhorar", "Testar e implantar a solução."],
      ["Controlar", "Padronizar para o ganho permanecer."]
    ],
    conexao: "No Grupo GPS, como Analista de Planejamento e Qualidade, acompanhei indicadores de eficiência e desvios de padrão. O método deu estrutura para sair do indicador, encontrar a causa e padronizar a correção."
  }
];
