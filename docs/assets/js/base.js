// Comportamento comum a todas as páginas do site.
const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

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

// Rodapé e popup de contato, os mesmos em todas as páginas.
const CONTATO = {
  email: "gabriel.barbosa.j01@gmail.com",
  linkedin: "https://www.linkedin.com/in/gabriel-barbosa-j/",
  github: "https://github.com/Gabriiel-Barbosa"
};
const SIMBOLOS_CONTATO = {
  email: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.500 7.500L12 13l8.500-5.500"/></svg>',
  linkedin: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>',
  github: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
};
const linkExterno = 'target="_blank" rel="noopener"';

const rodape = document.querySelector("footer");
rodape.id = "contato";
rodape.innerHTML = `<div class="miolo rodape">
  <p class="direitos">© 2026 Gabriel Barbosa. Todos os direitos reservados.</p>
  <nav class="rodape-links" aria-label="Contatos">
    <a href="mailto:${CONTATO.email}">${SIMBOLOS_CONTATO.email}${CONTATO.email}</a>
    <a href="${CONTATO.linkedin}" ${linkExterno}>${SIMBOLOS_CONTATO.linkedin}LinkedIn</a>
    <a href="${CONTATO.github}" ${linkExterno}>${SIMBOLOS_CONTATO.github}GitHub</a>
  </nav>
</div>`;

const janelaContato = document.createElement("dialog");
janelaContato.className = "janela janela-contato";
janelaContato.setAttribute("aria-labelledby", "contato-titulo");
janelaContato.innerHTML = `<div class="janela-miolo">
  <button class="fechar-janela" type="button" aria-label="Fechar">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
  </button>
  <h2 id="contato-titulo">Entre em contato</h2>
  <div class="canais">
    <a href="mailto:${CONTATO.email}">${SIMBOLOS_CONTATO.email}<span><strong>E-mail</strong>${CONTATO.email}</span></a>
    <a href="${CONTATO.linkedin}" ${linkExterno}>${SIMBOLOS_CONTATO.linkedin}<span><strong>LinkedIn</strong>Gabriel Barbosa</span></a>
  </div>
</div>`;
document.body.append(janelaContato);
janelaContato.querySelector(".fechar-janela").addEventListener("click", () => janelaContato.close());
janelaContato.addEventListener("click", e => { if (e.target === janelaContato) janelaContato.close(); });
document.querySelector('.barra nav a[href="#contato"]').addEventListener("click", e => {
  e.preventDefault();
  janelaContato.showModal();
});
