document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".color-block");
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };


  const atualizarCor = (block) => {
    if (block.getAttribute("data-bloqueado") === "true") return;

    const novaCor = getRandomColor();
    block.style.backgroundColor = novaCor;
    block.setAttribute("data-cor", novaCor);
  };


  blocks.forEach((block) => {
    atualizarCor(block); 
    block.setAttribute("data-bloqueado", "false");


    const trocarBtn = block.querySelector(".trocar-btn");
    if (trocarBtn) {
      trocarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        atualizarCor(block);
      });
    }


    const fixarBtn = block.querySelector(".fixar-btn");
    if (fixarBtn) {
      fixarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const bloqueado = block.getAttribute("data-bloqueado") === "true";
        block.setAttribute("data-bloqueado", (!bloqueado).toString());
        const img = fixarBtn.querySelector('img');
        img.src = bloqueado ? '../assets/pin.png' : '../assets/cadeado.png';
      });
    }

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

  const trocarTodasBtn = document.getElementById("trocarCoresBtn");
  if (trocarTodasBtn) {
    trocarTodasBtn.addEventListener("click", () => {
      blocks.forEach((block) => atualizarCor(block));
    });
  }
});
