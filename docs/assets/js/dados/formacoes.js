// Conteúdo dos popups de formação. Só o que está no currículo; o resto aparece como pendente.
const FORMACOES = [
  {
    sigla: "MBA", titulo: "MBA em Controladoria e Finanças Corporativas", status: "Em andamento", concluido: false,
    temas: ["Controladoria", "Finanças corporativas"],
    sobre: "Pós-graduação em andamento, que amplia minha visão de finanças e controle para apoiar decisões de gestão.",
    onde: [["Universidade Salvador", "Julho de 2026 a julho de 2027"]],
    conexao: "Complementa meu trabalho com custos, indicadores e planejamento.",
    pendencias: ["Principais disciplinas do MBA"]
  },
  {
    sigla: "ADS", titulo: "Análise e Desenvolvimento de Sistemas", status: "Concluído", concluido: true,
    temas: ["Graduação tecnológica", "Tecnologia da Informação"],
    sobre: "Graduação que me deu a base de sistemas e programação que hoje aplico em dados.",
    onde: [
      ["Instituto Federal Baiano, Campus Catu", "Janeiro de 2020 a agosto de 2024"],
      ["Universidade Salvador", "Agosto a dezembro de 2024"]
    ],
    conexao: "Sustenta a parte técnica do meu trabalho com dados e automação.",
    pendencias: ["Como citar as duas instituições"]
  },
  {
    sigla: "6σ", titulo: "Six Sigma Green Belt", status: "Concluído", concluido: true,
    temas: ["Qualidade", "Melhoria de processos"],
    sobre: "Certificação em Six Sigma, metodologia voltada à melhoria de processos.",
    onde: [],
    conexao: "Apoia meu trabalho com qualidade, padronização e indicadores.",
    pendencias: ["Instituição e ano da certificação"]
  }
];
