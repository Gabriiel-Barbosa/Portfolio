// Página completa de um projeto, escolhido pelo endereço: projeto.html?id=gestao-de-contratos
// A página conta a história em cinco partes: abertura, desafio, estratégia, solução e impacto.
const projeto = PROJETOS.find(p => p.id === new URLSearchParams(location.search).get("id"));
const topo = document.getElementById("topo-projeto");
const corpo = document.getElementById("corpo-projeto");
const final = document.getElementById("final-projeto");

const INDICE = [["desafio", "O desafio"], ["estrategia", "A estratégia"], ["solucao", "A solução"], ["telas", "As telas"], ["impacto", "O impacto"]];

const bloco = (id, rotulo, titulo, conteudo) => `<section class="bloco-projeto" id="${id}" aria-labelledby="titulo-${id}">
  <span class="rotulo-bloco">${rotulo}</span>
  <h2 id="titulo-${id}">${titulo}</h2>
  ${conteudo}
</section>`;
const blocoPendente = (id, rotulo) => bloco(id, rotulo, "Em construção", textoPendente);
const cartoes = itens => `<div class="cartoes-projeto${itens.length === 4 ? " duplo" : ""}">${itens.map(i => `<article><h3>${i.titulo}</h3><p>${i.texto}</p></article>`).join("")}</div>`;
const lista = itens => `<ul class="lista-projeto">${itens.map(i => `<li>${i}</li>`).join("")}</ul>`;

const htmlDesafio = d => bloco("desafio", "O desafio", d.titulo, `<p>${d.texto}</p>
  <h3>${d.perguntasTitulo}</h3>${lista(d.perguntas)}
  <p class="destaque-texto"><strong>Consequências:</strong> ${d.consequencias}</p>`);

const htmlEstrategia = e => bloco("estrategia", "A estratégia", e.titulo, `${cartoes(e.frentes)}
  ${e.ciclo ? `<h3>O ciclo acompanhado</h3>
  <ol class="ciclo">${e.ciclo.map(etapa => `<li>${etapa}</li>`).join("")}</ol>` : ""}
  <h3>Critérios adotados</h3>${lista(e.criterios)}`);

const htmlSolucao = s => bloco("solucao", "A solução", s.titulo, cartoes(s.componentes));

const htmlPainel = p => bloco("painel", "O dashboard", "Use o dashboard", `<p class="aviso-simulado">Painel publicado no Power BI, com os dados fictícios do cenário.</p>
  <div class="painel-ao-vivo"><iframe src="${p.painelAoVivo}" title="${p.nome}" loading="lazy" allowfullscreen></iframe></div>`);

function htmlTelas(telas, titulo = "Cada parte do controle, por dentro") {
  const temas = [...new Set(telas.flatMap(t => t.temas))];
  const qtd = tema => telas.filter(t => t.temas.includes(tema)).length;
  const chip = (id, nome, total) => `<button class="chip" type="button" data-tema="${id}" aria-pressed="${!id}">${nome}<span>${total}</span></button>`;
  return `<span class="rotulo-bloco">As telas</span>
    <h2 id="titulo-telas">${titulo}</h2>
    <div class="chips" id="filtro-telas" role="group" aria-label="Filtrar telas por assunto">${chip("", "Todas", telas.length)}${temas.map(t => chip(t, t, qtd(t))).join("")}</div>
    <div class="galeria">${telas.map((t, i) => `<figure class="tela" data-temas="${t.temas.join("|")}">
      <button class="abrir-tela" type="button" data-tela="${i}" aria-label="Ampliar a tela ${t.titulo}"><img src="${t.arquivo}" alt="Tela: ${t.titulo}" loading="lazy"></button>
      <figcaption><h3>${t.titulo}</h3><p>${t.descricao}</p><div class="temas-tela">${t.temas.map(tema => `<button class="tag" type="button" data-tema="${tema}">${tema}</button>`).join("")}</div></figcaption>
    </figure>`).join("")}</div>`;
}

const htmlImpacto = i => bloco("impacto", "O impacto", i.titulo, `<p class="aviso-simulado">${i.aviso}</p>
  <dl class="numeros grandes">${i.leituras.map(l => `<div><dt>${l.rotulo}</dt><dd>${l.valor}</dd></div>`).join("")}</dl>
  ${i.limites ? `<div class="cartoes-projeto duplo">
    <article><h3>Limites do controle</h3><p>${i.limites}</p></article>
    <article><h3>Próximo passo</h3><p>${i.proximoPasso}</p></article>
  </div>` : ""}`);

if (projeto) {
  document.title = `${projeto.nome} | Gabriel Barbosa`;
  const telas = projeto.telas || [];
  const indice = projeto.painelAoVivo ? INDICE.flatMap(item => item[0] === "telas" ? [["painel", "O dashboard"], item] : [item]) : INDICE;
  topo.classList.add("abertura-projeto");
  topo.innerHTML = `<div class="abertura-texto">
      <a class="voltar" href="projetos.html">Todos os projetos</a>
      <span class="e-nome">${nomeCategoria(projeto.categoria)}</span>
      <h1>${projeto.nome}</h1>
      ${projeto.frase ? `<p class="frase-projeto">${projeto.frase}</p>` : ""}
      <p>${projeto.resumo}</p>
      ${projeto.natureza ? `<span class="natureza">${projeto.natureza}</span>` : ""}
      ${projeto.pendente ? `<span class="pendente">${projeto.pendente}</span>` : ""}
      ${numerosDe(projeto)}
    </div>
    <div class="abertura-print">${telas.length
      ? `<button class="abrir-tela capa" type="button" data-tela="0" aria-label="Ampliar a tela principal"><img class="print-img" src="${projeto.print}" alt="Tela do projeto ${projeto.nome}"></button>`
      : visualDoProjeto(projeto)}</div>`;

  corpo.innerHTML = `<div class="projeto-principal">
      ${projeto.desafio ? htmlDesafio(projeto.desafio) : blocoPendente("desafio", "O desafio")}
      ${projeto.estrategia ? htmlEstrategia(projeto.estrategia) : blocoPendente("estrategia", "A estratégia")}
      ${projeto.solucao ? htmlSolucao(projeto.solucao) : blocoPendente("solucao", "A solução")}
    </div>
    <aside class="projeto-lateral">
      <nav class="indice-projeto" aria-label="Nesta página">${indice.map(([id, nome]) => `<a href="#${id}">${nome}</a>`).join("")}</nav>
      ${fichaDoProjeto(projeto)}
      ${projeto.painelAoVivo ? `<a class="botao cheio" href="${projeto.painelAoVivo}" target="_blank" rel="noopener">Abrir o dashboard</a>` : ""}
      ${projeto.link ? `<a class="botao ${projeto.painelAoVivo ? "vazio" : "cheio"}" href="${projeto.link}" target="_blank" rel="noopener">${projeto.painelAoVivo ? "Ver o repositório" : "Abrir o projeto"}</a>` : ""}
    </aside>`;

  final.innerHTML = `${projeto.painelAoVivo ? htmlPainel(projeto) : ""}
    <section class="bloco-projeto telas-projeto" id="telas" aria-labelledby="titulo-telas">${telas.length ? htmlTelas(telas, projeto.tituloTelas) : `<span class="rotulo-bloco">As telas</span><h2 id="titulo-telas">Em construção</h2>${textoPendente}`}</section>
    ${projeto.impacto ? htmlImpacto(projeto.impacto) : blocoPendente("impacto", "O impacto")}`;

  if (telas.length) iniciarGaleria(telas);
} else {
  topo.innerHTML = `<h1>Projeto não encontrado</h1><p>Este endereço não corresponde a nenhum projeto.</p><a class="voltar" href="projetos.html">Todos os projetos</a>`;
}

function iniciarGaleria(telas) {
  const chips = document.getElementById("filtro-telas");
  const figuras = [...final.querySelectorAll(".tela")];

  function filtrar(tema) {
    chips.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.tema === tema));
    figuras.forEach(f => { f.hidden = !!tema && !f.dataset.temas.split("|").includes(tema); });
  }

  final.addEventListener("click", e => {
    const filtro = e.target.closest("[data-tema]");
    if (filtro) filtrar(filtro.dataset.tema);
  });

  const janela = document.createElement("dialog");
  janela.className = "janela janela-tela";
  janela.setAttribute("aria-labelledby", "tela-titulo");
  janela.innerHTML = `<div class="janela-miolo">
    <button class="fechar-janela" type="button" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <div class="cabeca-tela"><h2 id="tela-titulo"></h2><p></p><span class="contagem-tela"></span></div>
    <div class="palco-tela" tabindex="0"><img alt=""></div>
    <div class="acoes-tela">
      <button class="botao vazio pequeno" type="button" data-passo="-1">Tela anterior</button>
      <button class="botao vazio pequeno" type="button" data-passo="1">Próxima tela</button>
    </div>
  </div>`;
  document.body.append(janela);

  const palco = janela.querySelector(".palco-tela");
  const imagem = palco.querySelector("img");
  let lista = [];
  let atual = 0;

  function mostrar(posicao) {
    atual = (posicao + lista.length) % lista.length;
    const tela = telas[lista[atual]];
    imagem.src = tela.arquivo;
    imagem.alt = `Tela: ${tela.titulo}`;
    palco.classList.toggle("larga", !!tela.larga);
    palco.scrollTo(0, 0);
    janela.querySelector("h2").textContent = tela.titulo;
    janela.querySelector(".cabeca-tela p").textContent = tela.descricao;
    janela.querySelector(".contagem-tela").textContent = `${atual + 1} de ${lista.length}`;
  }

  document.addEventListener("click", e => {
    const botao = e.target.closest(".abrir-tela");
    if (!botao) return;
    // Com um filtro ativo, as setas percorrem só as telas filtradas.
    lista = figuras.flatMap((f, i) => f.hidden ? [] : [i]);
    const indice = Number(botao.dataset.tela);
    if (!lista.includes(indice)) lista = telas.map((_, i) => i);
    mostrar(lista.indexOf(indice));
    janela.showModal();
  });

  janela.querySelector(".fechar-janela").addEventListener("click", () => janela.close());
  janela.addEventListener("click", e => {
    if (e.target === janela) janela.close();
    const passo = e.target.closest("[data-passo]");
    if (passo) mostrar(atual + Number(passo.dataset.passo));
  });
  janela.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" && !palco.classList.contains("larga")) mostrar(atual + 1);
    if (e.key === "ArrowLeft" && !palco.classList.contains("larga")) mostrar(atual - 1);
  });
}
