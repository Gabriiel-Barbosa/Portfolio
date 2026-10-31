const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

function criar(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto) el.textContent = texto;
  return el;
}

// Troca de tema com a nova cor abrindo em círculo a partir do botão.
const botaoTema = document.getElementById("tema");
function aplicarTema() {
  const novo = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = novo;
  try { localStorage.setItem("tema", novo === "dark" ? "escuro" : "claro"); } catch (e) {}
}
botaoTema.addEventListener("click", () => {
  if (semMovimento || !document.startViewTransition) { aplicarTema(); return; }
  const r = botaoTema.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const raio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(aplicarTema).ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${raio}px at ${x}px ${y}px)`] },
      { duration: 520, easing: "cubic-bezier(.23, 1, .32, 1)", pseudoElement: "::view-transition-new(root)" }
    );
  });
});

// O menu só ganha fundo depois que a página rola.
const barraTopo = document.querySelector(".barra");
const marcarRolagem = () => barraTopo.classList.toggle("rolou", scrollY > 8);
addEventListener("scroll", marcarRolagem, { passive: true });
marcarRolagem();

// A linha de "Como trabalho" acompanha a rolagem.
const fluxo = document.getElementById("fluxo");
function atualizarFluxo() {
  const r = fluxo.getBoundingClientRect();
  const p = (innerHeight * .9 - r.top) / (innerHeight * .6);
  fluxo.style.setProperty("--progresso", Math.min(1, Math.max(.08, p)).toFixed(3));
}
if (!semMovimento) {
  addEventListener("scroll", atualizarFluxo, { passive: true });
  atualizarFluxo();
}

// Janela de detalhes, usada pelos trabalhos e pelas formações.
const ICONES = {
  entregas: '<path d="M4 12l5 5L20 6"/>',
  certo: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.800 2.700 4 5.700 4 9s-1.200 6.300-4 9c-2.800-2.700-4-5.700-4-9s1.200-6.300 4-9z"/>',
  capelo: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.500V16c1.800 1.600 3.800 2.400 6 2.400s4.200-.8 6-2.400v-4.500"/>',
  monitor: '<rect x="3" y="4" width="18" height="12.500" rx="2.500"/><path d="M9 20.500h6"/><path d="M12 16.500v4"/>',
  celular: '<rect x="7" y="2.500" width="10" height="19" rx="2.500"/><path d="M11 18.500h2"/>',
  grafico: '<path d="M4 4v16h16"/><path d="M8 16v-4"/><path d="M12.500 16V8"/><path d="M17 16v-6"/>',
  medidor: '<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 14l4-5"/><circle cx="12" cy="14" r="1.500"/>',
  pessoas: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c.5-3.700 3-6 6.500-6s6 2.300 6.500 6"/><path d="M16 4.800a3.500 3.500 0 0 1 0 6.400"/><path d="M18 14.500c2 .8 3.200 2.800 3.500 5.500"/>',
  ciclo: '<path d="M20 11a8 8 0 0 0-14-4.500L4 9"/><path d="M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14 4.500l2-2.500"/><path d="M20 20v-5h-5"/>',
  custos: '<circle cx="12" cy="12" r="9"/><path d="M15 9c-.6-1.200-1.700-1.800-3-1.800-1.700 0-3 .9-3 2.300 0 3.200 6 1.700 6 5 0 1.400-1.300 2.300-3 2.300-1.300 0-2.400-.6-3-1.800"/><path d="M12 5.500v13"/>',
  calendario: '<rect x="3.500" y="5" width="17" height="15.500" rx="3"/><path d="M3.500 10h17"/><path d="M8 3v4"/><path d="M16 3v4"/>',
  livro: '<path d="M12 7v13"/><path d="M12 7c-2-1.500-4.500-2-8-2v13c3.500 0 6 .5 8 2 2-1.500 4.500-2 8-2V5c-3.500 0-6 .5-8 2z"/>',
  rota: '<circle cx="6" cy="19" r="2.500"/><circle cx="18" cy="5" r="2.500"/><path d="M8.500 19H15a3.500 3.500 0 0 0 0-7H9a3.500 3.500 0 0 1 0-7h6.500"/>',
  python: '<path fill="currentColor" stroke="none" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>',
  codigo: '<path d="M8 7l-5 5 5 5"/><path d="M16 7l5 5-5 5"/><path d="M13.500 5l-3 14"/>',
  chip: '<rect x="6.500" y="6.500" width="11" height="11" rx="2"/><path d="M10 3v3.500"/><path d="M14 3v3.500"/><path d="M10 17.500V21"/><path d="M14 17.500V21"/><path d="M3 10h3.500"/><path d="M3 14h3.500"/><path d="M17.500 10H21"/><path d="M17.500 14H21"/>',
  tabela: '<rect x="3.500" y="4" width="17" height="16" rx="3"/><path d="M3.500 10h17"/><path d="M3.500 15h17"/><path d="M10 10v10"/>',
  alvo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  controles: '<path d="M4 7h9"/><path d="M19 7h1"/><circle cx="16" cy="7" r="2.500"/><path d="M4 17h1"/><path d="M11 17h9"/><circle cx="8" cy="17" r="2.500"/>',
  documento: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/>'
};
const icone = nome => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nome]}</svg>`;
// Ícone que se desenha ao abrir o popup: cada traço usa pathLength 1 para a animação medir igual.
const iconeVivo = (nome, ordem) => `<span class="e-ic" style="--i:${ordem}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nome].replace(/<(path|circle|rect)/g, '<$1 pathLength="1"')}</svg></span>`;

const janela = document.getElementById("janela-emprego");
const conteudoEmprego = document.getElementById("conteudo-emprego");

function desenharEmprego(e) {
  const fatos = e.fatos.map(([r, v]) => `<div><dt>${r}</dt><dd>${v}</dd></div>`).join("");
  const abertas = e.frentesAbertas || e.frentes.length;
  const seta = '<svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const outras = e.frentes.slice(abertas).map(([ic, t, d, itens], i) => `<details name="frentes">
    <summary>${iconeVivo(ic, i + abertas)}<span><strong>${t}</strong></span>${seta}</summary>
    <div class="e-outra"><p>${d}</p>${itens.length ? `<ul>${itens.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}</div>
  </details>`).join("");
  const frentes = e.frentes.slice(0, abertas).map(([ic, t, d, itens], i) => `<article class="e-frente" style="--i:${i}">
    ${iconeVivo(ic, i)}
    <div class="e-frente-corpo">
      <h3>${t}</h3><p>${d}</p>
      ${itens.length ? `<ul>${itens.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}
    </div>
  </article>`).join("");
  const destaques = e.destaques.map(([t, d]) => `<article class="e-destaque"><h4>${t}</h4><p>${d}</p></article>`).join("");
  const tecnologias = e.tecnologias.map(([ic, t, d], i) => `<span>${iconeVivo(ic, i + 3)}<span>${t}${d ? `<small>${d}</small>` : ""}</span></span>`).join("");
  conteudoEmprego.innerHTML = `<div class="janela-grade e-grade">
    <div class="janela-principal formacao">
      <div class="e-topo">
        <h2 id="janela-titulo">${e.cargo}</h2>
        <span class="e-nome">${e.empresa}</span>
      </div>
      <p class="e-visao">${e.visao}</p>
      <div class="e-frentes">${frentes}</div>
      ${outras ? `<section class="f-secao"><h3>Outras frentes</h3><div class="f-estudos e-outras">${outras}</div></section>` : ""}
      ${e.pendenciaNumeros ? `<div><span class="pendente">Resultados com números a preencher</span></div>` : ""}
    </div>
    <aside class="janela-lateral e-lateral">
      <section class="f-secao"><h3>Em resumo</h3><dl class="f-fatos">${fatos}</dl></section>
      <section class="f-secao"><h3>Destaques e conquistas</h3><div class="e-destaques">${destaques}</div></section>
      <section class="f-secao"><h3>Tecnologias e competências</h3><div class="e-tecs">${tecnologias}</div></section>
      <div class="lateral-rodape">
        <span>Conheça também meus projetos próprios</span>
        <a class="botao cheio" id="ir-projetos" href="#projetos">Ver projetos</a>
      </div>
    </aside>
  </div>`;
  document.getElementById("ir-projetos").addEventListener("click", () => janela.close());
}

function desenharFormacao(f) {
  const status = f.concluido
    ? `<span class="status-feito">${icone("entregas")}${f.status}</span>`
    : `<span class="status-vivo"><i></i>${f.status}</span>`;
  const fatos = f.fatos.map(([r, v]) => `<div><dt>${r}</dt><dd>${v}</dd></div>`).join("");
  const estudos = (f.estudos || []).map(([t, d, itens], i) => `<details name="estudos"${i ? "" : " open"}>
    <summary><span><strong>${t}</strong><span>${d}</span></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary>
    <div class="uso">${itens.map(x => `<span>${x}</span>`).join("")}</div>
  </details>`).join("");
  const metodo = (f.metodo || []).map(([t, d]) => `<li><strong>${t}</strong><span>${d}</span></li>`).join("");
  conteudoEmprego.innerHTML = `<div class="janela-principal formacao">
    <div class="janela-topo">
      <span class="monograma monograma-formacao" aria-hidden="true">${f.sigla}</span>
      <div class="janela-cargo"><h2 id="janela-titulo">${f.titulo}</h2>${status}</div>
    </div>
    <p class="f-lide">${f.lide}</p>
    <dl class="f-fatos">${fatos}</dl>
    <section class="f-secao"><h3>O que é</h3><p>${f.oQueE}</p></section>
    ${estudos ? `<section class="f-secao"><h3>${f.tituloEstudos}</h3><div class="f-estudos">${estudos}</div></section>` : ""}
    ${metodo ? `<section class="f-secao"><h3>${f.tituloMetodo}</h3><ol class="f-metodo">${metodo}</ol></section>` : ""}
    ${f.fazer ? `<section class="competencias"><h3>${f.tituloFazer}</h3><ul>${f.fazer.map(c => `<li>${icone("certo")}<span>${c}</span></li>`).join("")}</ul></section>` : ""}
    <section class="f-secao f-conexao"><h3>Como isso aparece no meu trabalho</h3><p>${f.conexao}</p></section>
  </div>`;
}

const COLECOES = {
  emprego: { itens: EMPREGOS, desenhar: desenharEmprego },
  formacao: { itens: FORMACOES, desenhar: desenharFormacao }
};
let colecaoAtual = COLECOES.emprego;
let itemAtual = 0;

function mostrarItem(indice, direcao = 0) {
  const total = colecaoAtual.itens.length;
  itemAtual = (indice + total) % total;
  colecaoAtual.desenhar(colecaoAtual.itens[itemAtual]);
  document.getElementById("posicao-emprego").textContent = `${itemAtual + 1} de ${total}`;
  janela.scrollTop = 0;
  if (direcao && !semMovimento) {
    conteudoEmprego.animate(
      [{ opacity: 0, transform: `translateX(${direcao * 36}px)` }, { opacity: 1, transform: "none" }],
      { duration: 280, easing: "cubic-bezier(.23, 1, .32, 1)" }
    );
  }
}

function abrirJanela(colecao, indice) {
  colecaoAtual = COLECOES[colecao];
  janela.classList.toggle("estreita", colecao === "formacao");
  mostrarItem(indice);
  janela.showModal();
}

document.querySelectorAll(".abrir-emprego").forEach(b => {
  b.addEventListener("click", () => abrirJanela("emprego", Number(b.dataset.indice)));
});
document.querySelectorAll(".abrir-formacao").forEach(b => {
  b.addEventListener("click", () => abrirJanela("formacao", Number(b.dataset.indice)));
});
document.getElementById("emprego-anterior").addEventListener("click", () => mostrarItem(itemAtual - 1, -1));
document.getElementById("emprego-proximo").addEventListener("click", () => mostrarItem(itemAtual + 1, 1));
janela.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") mostrarItem(itemAtual - 1, -1);
  if (e.key === "ArrowRight") mostrarItem(itemAtual + 1, 1);
});
document.getElementById("fechar-emprego").addEventListener("click", () => janela.close());
janela.addEventListener("click", e => { if (e.target === janela) janela.close(); });

// Barra do curso em andamento, contada em meses a partir das datas do currículo.
const emMeses = texto => { const [a, m] = texto.split("-").map(Number); return a * 12 + m; };
document.querySelectorAll(".progresso-curso").forEach(bloco => {
  const hoje = new Date();
  const inicio = emMeses(bloco.dataset.inicio), fim = emMeses(bloco.dataset.fim);
  const total = fim - inicio;
  const passados = Math.min(total, Math.max(0, hoje.getFullYear() * 12 + hoje.getMonth() + 1 - inicio));
  bloco.style.setProperty("--p", (passados / total).toFixed(3));
  bloco.querySelector("#meses-curso").textContent = `${passados} de ${total} meses`;
});
