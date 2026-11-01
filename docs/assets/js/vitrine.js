// Vitrine da home: trilho de categorias à esquerda e, à direita, um projeto grande e dois menores.
const LUGARES_POR_CATEGORIA = 3;

const cartaoADefinir = classe => `<article class="projeto a-definir ${classe}">
  <div class="print">Espaço para o print</div>
  <div class="corpo-projeto"><span class="pendente">Projeto a definir</span></div>
</article>`;

const projetosDa = categoria => PROJETOS.filter(p => p.categoria === categoria.id).slice(0, LUGARES_POR_CATEGORIA);

function painelDa(categoria) {
  const projetos = projetosDa(categoria);
  return Array.from({ length: LUGARES_POR_CATEGORIA }, (_, i) => {
    const classe = i === 0 ? "principal" : "secundario";
    return projetos[i] ? cartaoProjeto(projetos[i], { titulo: "h3", classe }) : cartaoADefinir(classe);
  }).join("");
}

// Abre na primeira categoria que já tem projetos.
const abaInicial = Math.max(0, CATEGORIAS.findIndex(c => projetosDa(c).length));

const vitrine = document.getElementById("vitrine");
vitrine.innerHTML = `<div class="trilho-vitrine">
  <div class="abas-vitrine" role="tablist" aria-label="Categorias de projetos" aria-orientation="vertical">
    <span class="marcador-aba" aria-hidden="true"></span>
    ${CATEGORIAS.map((c, i) => `<button class="aba-vitrine" type="button" role="tab" id="aba-${c.id}" aria-controls="painel-${c.id}" aria-selected="${i === abaInicial}" tabindex="${i === abaInicial ? 0 : -1}"><span class="num-aba" aria-hidden="true">0${i + 1}</span><span class="nome-aba">${c.nome}</span></button>`).join("")}
  </div>
  <a class="botao vazio ver-todos" href="projetos.html">Ver todos os projetos<svg class="ic" aria-hidden="true"><use href="#i-seta"/></svg></a>
</div>
<div class="palco-vitrine">
  ${CATEGORIAS.map((c, i) => `<div class="painel-vitrine" role="tabpanel" id="painel-${c.id}" aria-labelledby="aba-${c.id}"${i === abaInicial ? "" : " hidden"}>${painelDa(c)}</div>`).join("")}
</div>`;

const listaAbas = vitrine.querySelector(".abas-vitrine");
const abas = [...vitrine.querySelectorAll(".aba-vitrine")];
const paineis = [...vitrine.querySelectorAll(".painel-vitrine")];
let abaAtual = abaInicial;

// O marcador desliza até a aba ativa, na vertical ou na horizontal, conforme o layout.
function moverMarcador() {
  const aba = abas[abaAtual];
  listaAbas.style.setProperty("--marcador-x", `${aba.offsetLeft}px`);
  listaAbas.style.setProperty("--marcador-y", `${aba.offsetTop}px`);
  listaAbas.style.setProperty("--marcador-largura", `${aba.offsetWidth}px`);
  listaAbas.style.setProperty("--marcador-altura", `${aba.offsetHeight}px`);
}

function selecionarAba(indice, focar = false) {
  // Os cards entram de baixo ao avançar no trilho e de cima ao voltar.
  paineis[indice].style.setProperty("--direcao", indice < abaAtual ? -1 : 1);
  abaAtual = indice;
  abas.forEach((aba, i) => {
    aba.setAttribute("aria-selected", i === indice);
    aba.tabIndex = i === indice ? 0 : -1;
    paineis[i].hidden = i !== indice;
  });
  if (focar) abas[indice].focus();
  moverMarcador();
  // No celular a lista rola de lado: mantém a aba ativa à vista, com a anterior aparecendo um pouco
  // para indicar que há mais categorias, sem mexer na página.
  listaAbas.scrollTo({ left: abas[indice].offsetLeft - 40 });
}

abas.forEach((aba, i) => {
  aba.addEventListener("click", () => selecionarAba(i));
  aba.addEventListener("keydown", e => {
    const proxima = (i + 1) % abas.length, anterior = (i - 1 + abas.length) % abas.length;
    const destino = { ArrowDown: proxima, ArrowRight: proxima, ArrowUp: anterior, ArrowLeft: anterior, Home: 0, End: abas.length - 1 }[e.key];
    if (destino === undefined) return;
    e.preventDefault();
    selecionarAba(destino, true);
  });
});
addEventListener("resize", moverMarcador);
document.fonts?.ready.then(moverMarcador);
selecionarAba(abaInicial);

// A luz do card acompanha o ponteiro.
vitrine.addEventListener("pointermove", e => {
  const cartao = e.target.closest(".projeto:not(.a-definir)");
  if (!cartao) return;
  const r = cartao.getBoundingClientRect();
  cartao.style.setProperty("--luz-x", `${e.clientX - r.left}px`);
  cartao.style.setProperty("--luz-y", `${e.clientY - r.top}px`);
});

// A seção se revela uma vez, quando entra na tela.
const secaoProjetos = document.getElementById("projetos");
if (!semMovimento && "IntersectionObserver" in window) {
  secaoProjetos.classList.add("aguardando");
  const observador = new IntersectionObserver(entradas => {
    if (!entradas.some(e => e.isIntersecting)) return;
    secaoProjetos.classList.remove("aguardando");
    observador.disconnect();
  }, { threshold: .12 });
  observador.observe(secaoProjetos);
}
