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
  sobre: '<path d="M4 21V6l8-3 8 3v15M9 21v-5h6v5M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>',
  frentes: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  entregas: '<path d="M4 12l5 5L20 6"/>',
  ferramentas: '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L3 18l3 3 6.2-6.2a4 4 0 0 0 5.3-5.3L15 12l-3-3z"/>',
  certo: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  local: '<path d="M12 21s7-6.200 7-11a7 7 0 0 0-14 0c0 4.800 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>'
};
const icone = nome => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nome]}</svg>`;
const bloco = (nome, titulo, corpo) => `<div class="bloco"><span class="icone-bloco">${icone(nome)}</span><div class="bloco-corpo"><h3>${titulo}</h3>${corpo}</div></div>`;
const ARTE = `<svg class="arte" viewBox="0 0 360 210" aria-hidden="true">
  <rect class="f1" x="40" y="30" width="280" height="150" rx="14"/>
  <rect class="f3" x="62" y="52" width="110" height="10" rx="5"/>
  <rect class="f2" x="62" y="124" width="20" height="36" rx="5"/><rect class="f2" x="92" y="104" width="20" height="56" rx="5"/><rect class="f2" x="122" y="116" width="20" height="44" rx="5"/><rect class="f2" x="152" y="84" width="20" height="76" rx="5"/>
  <circle class="aro2" cx="250" cy="110" r="38"/><circle class="aro" cx="250" cy="110" r="38" stroke-dasharray="150 239" transform="rotate(-90 250 110)"/>
</svg>`;

const janela = document.getElementById("janela-emprego");
const conteudoEmprego = document.getElementById("conteudo-emprego");

function desenharEmprego(e) {
  const frentes = e.frentes.map(([t, d]) => `<div><h4>${t}</h4><p>${d}</p></div>`).join("");
  const entregas = e.entregas.map(([t, d]) => `<div class="entrega"><h4>${t}</h4><p>${d}</p><span class="pendente">Resultado a preencher</span></div>`).join("");
  conteudoEmprego.innerHTML = `<div class="janela-grade">
    <div class="janela-principal">
      <div class="janela-topo">
        <div class="janela-marca"><span class="monograma" aria-hidden="true">${e.empresa[0]}</span>${e.empresa}</div>
        <div class="janela-cargo"><h2 id="janela-titulo">${e.cargo}</h2><span>${e.periodo}</span></div>
      </div>
      <div class="temas">${e.temas.map(t => `<span>${t}</span>`).join("")}</div>
      ${bloco("sobre", "Sobre a experiência", `<p>${e.sobre}</p>`)}
      ${bloco("frentes", "Principais frentes de atuação", `<div class="frentes">${frentes}</div>`)}
      ${entregas ? bloco("entregas", "Projetos e entregas", `<div class="entregas">${entregas}</div>`) : ""}
      ${bloco("ferramentas", "Ferramentas", `<div class="uso">${e.ferramentas.map(f => `<span>${f}</span>`).join("")}</div>`)}
    </div>
    <aside class="janela-lateral">
      ${ARTE}
      <div class="competencias">
        <h3>Competências desenvolvidas</h3>
        <ul>${e.competencias.map(c => `<li>${icone("certo")}<span>${c}</span></li>`).join("")}</ul>
      </div>
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
  const onde = f.onde.map(([nome, periodo]) => `<div class="entrega"><h4>${nome}</h4><p>${periodo}</p></div>`).join("");
  const pendencias = f.pendencias.map(p => `<span class="pendente">A preencher: ${p}</span>`).join("");
  conteudoEmprego.innerHTML = `<div class="janela-principal">
    <div class="janela-topo">
      <span class="monograma monograma-formacao" aria-hidden="true">${f.sigla}</span>
      <div class="janela-cargo"><h2 id="janela-titulo">${f.titulo}</h2>${status}</div>
    </div>
    <div class="temas">${f.temas.map(t => `<span>${t}</span>`).join("")}</div>
    ${bloco("sobre", "Sobre a formação", `<p>${f.sobre}</p>`)}
    ${onde ? bloco("local", "Onde e quando", `<div class="entregas">${onde}</div>`) : ""}
    ${bloco("frentes", "Como se conecta ao meu trabalho", `<p>${f.conexao}</p>`)}
    <div class="temas">${pendencias}</div>
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
