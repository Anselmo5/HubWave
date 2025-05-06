document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".color-block");

  // Função para gerar uma cor aleatória em hexadecimal
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };

  // Função que aplica uma nova cor a um bloco, se não estiver bloqueado
  const atualizarCor = (block) => {
    if (block.getAttribute("data-bloqueado") === "true") return;

    const novaCor = getRandomColor();
    block.style.backgroundColor = novaCor;
    block.setAttribute("data-cor", novaCor);
  };

  // Inicializa as cores ao entrar na página
  blocks.forEach((block) => {
    atualizarCor(block); // define cor inicial
    block.setAttribute("data-bloqueado", "false");

    // ========== BOTÃO TROCAR ==========
    const trocarBtn = block.querySelector(".trocar-btn");
    if (trocarBtn) {
      trocarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        atualizarCor(block);
      });
    }

    // ========== BOTÃO FIXAR ==========
    const fixarBtn = block.querySelector(".fixar-btn");
    if (fixarBtn) {
      fixarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const bloqueado = block.getAttribute("data-bloqueado") === "true";
        block.setAttribute("data-bloqueado", (!bloqueado).toString());
        fixarBtn.textContent = bloqueado ? "Fixar" : "Desbloquear";
      });
    }

    // ========== BOTÃO COPIAR ==========
    const copiarBtn = block.querySelector(".copiar-btn");
    if (copiarBtn) {
      copiarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const cor = block.getAttribute("data-cor");
        if (cor) {
          navigator.clipboard.writeText(cor)
            .then(() => alert(`Cor ${cor} copiada!`))
            .catch(() => alert("Erro ao copiar cor."));
        }
      });
    }
  });

  // Se quiser, pode ter um botão geral para trocar todas as cores
  const trocarTodasBtn = document.getElementById("trocarCoresBtn");
  if (trocarTodasBtn) {
    trocarTodasBtn.addEventListener("click", () => {
      blocks.forEach((block) => atualizarCor(block));
    });
  }
});
