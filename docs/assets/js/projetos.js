// Filtros da página de projetos.
// Dentro de um filtro vale qualquer opção marcada; entre filtros, o projeto precisa atender a todos.
// Categoria é um campo único no projeto; aqui vira lista para funcionar como os demais filtros.
PROJETOS.forEach(p => { p.categorias = [p.categoria]; });
const opcoesDe = campo => campo === "categorias"
  ? CATEGORIAS.map(c => c.id).filter(id => PROJETOS.some(p => p.categoria === id))
  : [...new Set(PROJETOS.flatMap(p => p[campo]))].sort((a, b) => a.localeCompare(b, "pt-BR"));
const MENUS = [
  { campo: "categorias", parametro: "categoria", el: document.getElementById("filtro-categoria"), rotulo: nomeCategoria },
  { campo: "tipos", parametro: "tipo", el: document.getElementById("filtro-tipo") },
  { campo: "tecnologias", parametro: "tecnologia", el: document.getElementById("filtro-tecnologia") },
  { campo: "setores", parametro: "setor", el: document.getElementById("filtro-setor") },
  { campo: "areas", parametro: "area", el: document.getElementById("filtro-area") },
  { campo: "competencias", parametro: "competencia", el: document.getElementById("filtro-competencia") }
];

const grade = document.getElementById("grade-projetos");
const contagem = document.getElementById("contagem");
const limpar = document.getElementById("limpar-filtros");

// Os filtros vêm do endereço, para que um link já abra a página filtrada.
const parametros = new URLSearchParams(location.search);
const estado = {};
MENUS.forEach(m => {
  const validas = opcoesDe(m.campo);
  estado[m.campo] = new Set((parametros.get(m.parametro) || "").split(",").filter(v => validas.includes(v)));
});

function atendeMenus(p) {
  return MENUS.every(m => !estado[m.campo].size || p[m.campo].some(v => estado[m.campo].has(v)));
}

function salvarNoEndereco() {
  const novos = new URLSearchParams();
  MENUS.forEach(m => { if (estado[m.campo].size) novos.set(m.parametro, [...estado[m.campo]].join(",")); });
  const busca = novos.toString().replace(/%2C/g, ",").replace(/\+/g, "%20");
  history.replaceState(null, "", `${location.pathname}${busca ? `?${busca}` : ""}${location.hash}`);
}

function desenharMenus() {
  MENUS.forEach(m => {
    const marcados = estado[m.campo];
    m.el.querySelector(".qtd-filtro").textContent = marcados.size || "";
    m.el.querySelector(".opcoes-filtro").innerHTML = opcoesDe(m.campo).map(v => `<label><input type="checkbox" value="${v}"${marcados.has(v) ? " checked" : ""}>${m.rotulo ? m.rotulo(v) : v}</label>`).join("");
  });
}

// As quatro categorias ficam lado a lado. Sem filtro, as vagas livres aparecem como projetos futuros,
// e cada coluna tem o mesmo número de linhas para os cartões ficarem alinhados.
const VAGAS_MINIMAS = 2;
const textoProjetos = total => total === 1 ? "1 projeto" : `${total} projetos`;
const prontosPrimeiro = (a, b) => Boolean(a.pendente) - Boolean(b.pendente);
const cartaoFuturo = `<article class="projeto futuro"><span>Projeto futuro</span></article>`;

function grupoDeProjetos(categoria, lista, futuros) {
  return `<section class="grupo-projetos" aria-labelledby="grupo-${categoria.id}">
    <div class="topo-grupo">
      <h2 id="grupo-${categoria.id}">${categoria.nome}</h2>
      <span>${lista.length ? textoProjetos(lista.length) : "Em breve"}</span>
    </div>
    <div class="grade-projetos">${[...lista].sort(prontosPrimeiro).map(p => cartaoProjeto(p, { compacto: true })).join("")}${cartaoFuturo.repeat(futuros)}</div>
  </section>`;
}

function desenharProjetos() {
  const filtrando = MENUS.some(m => estado[m.campo].size);
  const lista = PROJETOS.filter(atendeMenus);
  const grupos = CATEGORIAS
    .map(c => [c, lista.filter(p => p.categoria === c.id)])
    .filter(([, doGrupo]) => doGrupo.length || !filtrando);
  const vagas = Math.max(filtrando ? 1 : VAGAS_MINIMAS, ...grupos.map(([, doGrupo]) => doGrupo.length));
  contagem.textContent = textoProjetos(lista.length);
  grade.style.setProperty("--vagas", vagas);
  grade.innerHTML = lista.length
    ? grupos.map(([c, doGrupo]) => grupoDeProjetos(c, doGrupo, filtrando ? 0 : vagas - doGrupo.length)).join("")
    : `<div class="sem-resultado"><p>Nenhum projeto com esses filtros.</p><button class="botao vazio" type="button" data-limpar>Limpar filtros</button></div>`;
}

function atualizar() {
  limpar.hidden = MENUS.every(m => !estado[m.campo].size);
  desenharProjetos();
  salvarNoEndereco();
}

function limparFiltros() {
  MENUS.forEach(m => estado[m.campo].clear());
  desenharMenus();
  atualizar();
}

MENUS.forEach(m => {
  m.el.addEventListener("change", e => {
    if (e.target.checked) estado[m.campo].add(e.target.value);
    else estado[m.campo].delete(e.target.value);
    m.el.querySelector(".qtd-filtro").textContent = estado[m.campo].size || "";
    atualizar();
  });
});

// Os menus fecham ao clicar fora ou com Esc.
document.addEventListener("click", e => {
  MENUS.forEach(m => { if (!m.el.contains(e.target)) m.el.open = false; });
});
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  MENUS.forEach(m => {
    if (m.el.open) { m.el.open = false; m.el.querySelector("summary").focus(); }
  });
});

limpar.addEventListener("click", limparFiltros);
grade.addEventListener("click", e => {
  if (e.target.closest("[data-limpar]")) limparFiltros();
});

desenharMenus();
atualizar();
