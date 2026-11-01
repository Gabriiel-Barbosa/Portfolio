// Card de projeto e popup de resumo, usados na home e na página de projetos.
const nomeCategoria = id => CATEGORIAS.find(c => c.id === id).nome;
const linkDoProjeto = p => `projeto.html?id=${p.id}`;
const textoPendente = `<span class="pendente">A preencher</span>`;

// Cada tag abre a lista de projetos já filtrada por ela.
const PARAMETROS_TAG = { setores: "setor", areas: "area", tecnologias: "tecnologia", competencias: "competencia" };
const tagsDe = (p, campo) => p[campo]?.length
  ? `<ul class="tags">${p[campo].map(v => `<li><a class="tag" href="projetos.html?${PARAMETROS_TAG[campo]}=${encodeURIComponent(v)}">${v}</a></li>`).join("")}</ul>`
  : textoPendente;
const numerosDe = p => p.numeros ? `<dl class="numeros">${p.numeros.map(n => `<div><dt>${n.rotulo}</dt><dd>${n.valor}</dd></div>`).join("")}</dl>` : "";

function fichaDoProjeto(p) {
  const linha = (rotulo, conteudo) => `<div><h3>${rotulo}</h3>${conteudo}</div>`;
  const relacionado = PROJETOS.find(r => r.id === p.relacionado);
  const recursos = p.recursos ? `<ul class="tags">${p.recursos.map(v => `<li><span class="tag fixa">${v}</span></li>`).join("")}</ul>` : "";
  return `<div class="ficha">
    ${linha("Setores", tagsDe(p, "setores"))}
    ${linha("Áreas de negócio", tagsDe(p, "areas"))}
    ${linha("Ferramentas", tagsDe(p, "tecnologias") + recursos)}
    ${linha("Competências", tagsDe(p, "competencias"))}
    ${linha("Meu papel", p.papel ? `<p>${p.papel}</p>` : textoPendente)}
    ${relacionado ? linha("Projeto relacionado", `<ul class="tags"><li><a class="tag" href="${linkDoProjeto(relacionado)}">${relacionado.nome}</a></li></ul>`) : ""}
  </div>`;
}

const visualDoProjeto = p => p.print
  ? `<img class="print-img" src="${p.print}" alt="Tela do projeto ${p.nome}" loading="lazy">`
  : `<div class="print">Espaço para o print</div>`;

function cartaoProjeto(p, { titulo = "h3", classe = "", mostrarCategoria = false, compacto = false } = {}) {
  return `<article class="projeto ${classe}">
    ${visualDoProjeto(p)}
    <div class="corpo-projeto">
      ${mostrarCategoria ? `<span class="categoria-projeto">${nomeCategoria(p.categoria)}</span>` : ""}
      ${p.pendente ? `<span class="pendente">${p.pendente}</span>` : ""}
      <${titulo} class="titulo-projeto">${p.nome}</${titulo}>
      <p>${p.resumo}</p>
      <span class="tec">${p.tecnologias.join(", ")}</span>
      <div class="acoes-projeto">
        <button class="botao vazio pequeno abrir-resumo" type="button" data-projeto="${p.id}">${compacto ? "Resumo" : "Resumo do projeto"}</button>
        <a class="botao cheio pequeno" href="${linkDoProjeto(p)}">${compacto ? "Ver projeto" : "Ver projeto completo"}</a>
      </div>
    </div>
  </article>`;
}

// O popup é criado aqui para não repetir o HTML em cada página.
const janelaResumo = document.createElement("dialog");
janelaResumo.className = "janela estreita janela-resumo";
janelaResumo.setAttribute("aria-labelledby", "resumo-titulo");
janelaResumo.innerHTML = `<div class="janela-miolo">
  <button class="fechar-janela" type="button" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  <div class="conteudo-resumo"></div>
</div>`;
document.body.append(janelaResumo);

function abrirResumo(p) {
  janelaResumo.querySelector(".conteudo-resumo").innerHTML = `<div class="janela-principal formacao">
    <div class="e-topo topo-projeto">
      <h2 id="resumo-titulo">${p.nome}</h2>
      <span class="e-nome">${nomeCategoria(p.categoria)}</span>
    </div>
    ${p.natureza ? `<span class="natureza">${p.natureza}</span>` : ""}
    <p class="f-lide">${p.frase || p.resumo}</p>
    <div class="colunas-resumo">
      <div class="historia-resumo">${p.historia
        ? p.historia.map(h => `<section><h3>${h.titulo}</h3><p>${h.texto}</p></section>`).join("")
        : `<section><h3>Resumo do projeto</h3>${textoPendente}</section>`}</div>
      <div class="lateral-resumo">
        ${visualDoProjeto(p)}
        ${numerosDe(p)}
        <div class="ficha">
          <div><h3>Setores</h3>${tagsDe(p, "setores")}</div>
          <div><h3>Ferramentas</h3>${tagsDe(p, "tecnologias")}</div>
        </div>
      </div>
    </div>
    ${p.pendente ? `<div><span class="pendente">${p.pendente}</span></div>` : ""}
    <div class="acao-resumo"><a class="botao cheio" href="${linkDoProjeto(p)}">Ver projeto completo</a></div>
  </div>`;
  janelaResumo.showModal();
  janelaResumo.scrollTop = 0;
}

document.addEventListener("click", e => {
  const botao = e.target.closest(".abrir-resumo");
  if (botao) abrirResumo(PROJETOS.find(p => p.id === botao.dataset.projeto));
});
janelaResumo.querySelector(".fechar-janela").addEventListener("click", () => janelaResumo.close());
janelaResumo.addEventListener("click", e => { if (e.target === janelaResumo) janelaResumo.close(); });
