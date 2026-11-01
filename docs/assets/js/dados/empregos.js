// Conteúdo dos popups de experiência. Tudo vem do currículo e do que Gabriel contou; nada de número sem fonte.
// frentes: [ícone, título, descrição, tópicos]. destaques: [título, texto]. tecnologias: [ícone, título, detalhe opcional].
const EMPREGOS = [
  {
    empresa: "Clariens Educação", cargo: "Analista de Planejamento Acadêmico Sr", frentesAbertas: 2,
    visao: "Atuo no planejamento acadêmico da Clariens Educação, grupo de educação superior com foco em medicina e saúde. Minha frente é a análise de custos docentes, o dimensionamento de recursos e a organização das informações que apoiam a eficiência operacional e financeira das unidades de ensino. O desafio é manter a consistência entre as necessidades acadêmicas e o planejamento operacional, com dados confiáveis para decidir. A Arin e o SPA, citados abaixo, foram desenvolvidos por mim e pertencem à Clariens Educação.",
    fatos: [["Período", "Abril de 2026<br>até hoje"], ["Setor", "Educação superior"], ["Área", "Planejamento acadêmico"], ["Modelo de trabalho", "Híbrido"]],
    frentes: [
      ["chip", "Arin, Agente de Regras do Internato", "Criei a Arin, agente de IA com fine tuning, já em uso, que analisa todas as regras do internato de medicina, insere essas regras no CP-SAT e gera a agenda final, otimizando as regras e o custo. Quando a agenda é matematicamente impossível, ela indica. Com a Arin, criar as agendas ficou mais rápido e mais eficaz.", ["Rodízios e carga horária", "Disponibilidade dos cenários de prática", "Otimização com CP-SAT"]],
      ["monitor", "SPA, Sistema do Planejamento Acadêmico", "O planejamento funcionava em uma planilha cheia de VBA e Ribbons personalizadas, compartilhada com as unidades em um SharePoint, que travava e exigia cuidado com a segurança das informações. Surgiu a necessidade de uma ferramenta, e decidi desenvolvê-la: criei o SPA em Power Apps, com Code Apps e Dataverse, seguindo as regras e exigências do TI da Clariens. Hoje ele roda em ambiente homologado, com dados bem modelados em uma boa lógica de banco de dados.", ["Controle docente: contratação, vida docente e demissão", "Premissas e alocação docente nas disciplinas", "Carga horária e oscilações em tempo real", "Atividades fora de sala e folha no orçado x realizado", "Divisão por ciclo em Medicina e rateio de custos por curso nos demais"]],
      ["custos", "Custos docentes", "Análise e acompanhamento dos custos docentes para o uso eficiente dos recursos acadêmicos.", ["Carga horária e alocação de professores", "Premissas acadêmicas", "Rateio de custos", "Budget realizado x orçado"]],
      ["calendario", "Planejamento acadêmico", "Análise das matrizes curriculares e das ofertas de disciplinas, ligando as necessidades acadêmicas à operação.", ["Organização de matrizes curriculares", "Ofertas e cargas horárias"]],
      ["grafico", "Dados para decisão", "Controles, indicadores e análises para acompanhar o planejamento e apoiar decisões.", ["Consolidação e validação de dados", "Identificação de inconsistências e desvios", "Lançamento de folha"]],
      ["ciclo", "Melhoria contínua", "Apoio à padronização de processos e à melhoria contínua dos ciclos de planejamento.", ["Interface com as áreas da operação"]]
    ],
    destaques: [
      ["Arin, agente de IA", "Agendas do internato de medicina mais rápidas e eficazes."],
      ["SPA em Power Apps", "Sistema próprio no lugar da planilha com VBA."],
      ["Budget realizado x orçado", "Acompanhamento do orçamento frente ao realizado."],
      ["Custos de Medicina", "Avaliação dos ciclos Básico, Clínico e Internato."]
    ],
    tecnologias: [["grafico", "Power BI", "Power Query"], ["python", "Python", "Pandas e NumPy"], ["tabela", "Excel", "VBA"], ["monitor", "Power Apps", "Code Apps e Dataverse"], ["capelo", "Lyceum"], ["custos", "Análise de custos"], ["ciclo", "Pipelines de dados"], ["medidor", "Indicadores"], ["ciclo", "Padronização de processos"], ["alvo", "Melhoria contínua"], ["codigo", "Claude Code"], ["codigo", "Codex"], ["chip", "Agentes de IA"], ["pessoas", "Comunicação"], ["controles", "CP-SAT"], ["alvo", "Fine tuning"], ["documento", "SharePoint Lists"], ["codigo", "Desenvolvimento de sistemas"], ["tabela", "Modelagem de dados"], ["documento", "Lançamento de folha"]],
    pendenciaNumeros: true
  },
  {
    empresa: "dtech Treinamentos", cargo: "Analista Educacional",
    visao: "Atuei no desenvolvimento de soluções educacionais orientadas por dados, integrando metodologias pedagógicas, análise de desempenho e capacitação técnica para potencializar a aprendizagem e a empregabilidade dos alunos. Minha atuação combinou análise de dados, design instrucional e ensino técnico, contribuindo para experiências de aprendizagem mais eficientes, práticas e alinhadas às necessidades dos alunos e das organizações.",
    fatos: [["Período", "Maio de 2025<br>a abril de 2026"], ["Setor", "Educação e treinamentos"], ["Área", "Educacional"], ["Modelo de trabalho", "Presencial"]],
    frentes: [
      ["capelo", "Treinamentos", "Ministrei treinamentos de MS Project, Excel, Power BI e Informática.", ["Intensivos de Excel, Power BI e MS Project", "16 horas de aprendizado rápido em 2 dias de 8 horas"]],
      ["livro", "Ementas e materiais didáticos", "Reformulei as ementas dos cursos de Excel e Power BI, criei a ementa do curso de Educação Financeira KID'S e desenvolvi os materiais das aulas.", ["Apostilas e avaliações", "Exercícios práticos"]],
      ["rota", "Trilhas de aprendizagem", "Estruturei trilhas alinhadas às demandas do mercado de trabalho e produzi conteúdos para os cursos.", ["Conteúdos técnicos e comerciais"]],
      ["medidor", "Indicadores e acompanhamento", "Analisei indicadores educacionais e apliquei métricas para monitorar a eficácia das ações e encontrar oportunidades de melhoria.", ["Controle de conteúdo em Excel", "Acompanhamento das turmas em tempo real"]]
    ],
    destaques: [
      ["Intensivos de 16 horas", "Excel, Power BI e MS Project em 2 dias."],
      ["Ementas renovadas", "Excel e Power BI reformulados e novo curso KID'S."],
      ["Turmas em tempo real", "Controle de conteúdo em Excel para acompanhar as turmas."],
      ["Trilhas de aprendizagem", "Alinhadas às demandas do mercado de trabalho."]
    ],
    tecnologias: [["grafico", "Power BI"], ["tabela", "Excel"], ["calendario", "MS Project"], ["capelo", "Ensino técnico"], ["rota", "Design instrucional"], ["medidor", "Indicadores"], ["livro", "Criação de ementas"], ["grafico", "Análise de dados"]]
  },
  {
    empresa: "Grupo GPS", cargo: "Analista de Planejamento e Qualidade",
    visao: "Atuei no contrato de facilities do Grupo GPS para a Acelen, na Refinaria de Mataripe, em São Francisco do Conde, na Bahia. O contrato reunia limpeza predial, áreas verdes e coleta e depois incorporou a manutenção, em uma operação com até 90 pessoas. Também participei do Deep Clean, contrato voltado à limpeza completa da vegetação invasora, com as mesmas rotinas de conferência em campo. O desafio era organizar o planejamento em campo, alinhar o realizado ao orçado e entregar ao cliente e à GPS relatórios e indicadores confiáveis.",
    fatos: [["Período", "Novembro de 2023<br>a abril de 2025"], ["Cliente", "Acelen"], ["Setor", "Facilities"], ["Área", "Planejamento e qualidade"], ["Operação", "Até 90 pessoas"], ["Modelo de trabalho", "Presencial"]],
    frentes: [
      ["rota", "Planejamento de áreas verdes", "Organizei todo o planejamento de áreas verdes, dividi as áreas por setores dentro da refinaria e implantei o acompanhamento das atividades por marcação de área no Google Earth.", ["Divisão das áreas por setores", "Marcação de áreas no Google Earth", "Controles completos em Excel e BI"]],
      ["grafico", "Relatórios e painéis", "Implantei a cultura de BI no contrato, melhorei os relatórios enviados ao cliente e à GPS e criei um dashboard de acompanhamento das áreas verdes.", ["Dashboard em Looker Studio", "Padronização da comunicação de resultados"]],
      ["medidor", "Rotinas e indicadores", "Organizei as rotinas de limpeza e coleta para melhorar o processo de indicadores dentro da refinaria.", ["Conferência em campo e checklist do serviço realizado", "Controle e validação de medições", "Lançamento de folha de ponto"]],
      ["calendario", "GPS Vista", "Reorganizei o GPS Vista para que refletisse a realidade das atividades realizadas em relação às orçadas.", ["Realizado x orçado", "Acompanhamento diário da performance"]],
      ["documento", "Boletim de Medição", "Fiquei responsável por quatro meses pelo Boletim de Medição do contrato junto à Acelen, durante uma transição de coordenação.", ["Medição do contrato com o cliente"]],
      ["ciclo", "Análises e automação", "Fiz simulações para apoiar o redimensionamento de equipes e automatizei rotinas de dados.", ["Simulações com DAX e Excel avançado", "Processos de ETL"]]
    ],
    destaques: [
      ["NPS de 7 para 10", "Junto com a equipe, o NPS do contrato cresceu de 7 para 9 e depois chegou a 10."],
      ["Áreas verdes setorizadas", "Planejamento por setores, com marcação no Google Earth."],
      ["Cultura de BI implantada", "Dashboards e controles para acompanhar as áreas verdes."],
      ["GPS Vista em conformidade", "Realizado x orçado alinhado à realidade."],
      ["Boletim de Medição", "Quatro meses à frente da medição do contrato."]
    ],
    tecnologias: [["grafico", "Power BI", "Looker Studio"], ["codigo", "DAX"], ["tabela", "Excel"], ["calendario", "GPS Vista"], ["globo", "Google Earth"], ["medidor", "Indicadores"], ["rota", "Planejamento de facilities"], ["ciclo", "Automação de processos"], ["documento", "Padronização de relatórios"], ["controles", "Simulação de cenários"]]
  },
  {
    empresa: "DTech Educacional", cargo: "Estagiário de TI",
    visao: "Estágio focado no desenvolvimento de soluções tecnológicas e estratégicas para a DTech Educacional, empresa de educação em tecnologia que leva informática e robótica para alunos do Ensino Fundamental. A empresa precisava ganhar visibilidade, e um novo site era o caminho. Conciliei esse desenvolvimento com as aulas, os materiais didáticos e a manutenção dos kits de robótica, tudo em um estágio de cinco meses.",
    fatos: [["Período", "Junho de 2023<br>a outubro de 2023"], ["Área", "Tecnologia da Informação"], ["Modelo de trabalho", "Presencial"]],
    frentes: [
      ["globo", "Novo site da empresa", "Criei o novo site para dar mais visibilidade à empresa.", ["Desenvolvimento com Django e WordPress", "Versão entregue em WordPress, que entrou no ar"]],
      ["capelo", "Ensino de tecnologia", "Ministrei aulas de Arduino e informática para alunos do Fundamental II.", ["Criação de materiais didáticos", "Manutenção dos kits de robótica"]],
      ["celular", "Desenvolvimento do aplicativo", "Participei do desenvolvimento de um aplicativo com funcionalidades para os clientes.", []]
    ],
    destaques: [
      ["Novo site no ar", "Site em WordPress para dar mais visibilidade à empresa."],
      ["Aulas de tecnologia", "Arduino e informática para o Fundamental II."]
    ],
    tecnologias: [["globo", "Desenvolvimento web", "WordPress e Django"], ["python", "Python"], ["chip", "Arduino"], ["livro", "Materiais didáticos"], ["capelo", "Ensino de tecnologia"], ["celular", "Desenvolvimento de app"]]
  }
];
