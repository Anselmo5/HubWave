document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("uploadImage");
    const previewImg = document.getElementById("previewImg");
    const paletteContainer = document.getElementById("colorPalette");
    const colorThief = new ColorThief();
  
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
  
        previewImg.onload = () => {
          try {
            const palette = colorThief.getPalette(previewImg, 5);
            paletteContainer.innerHTML = "";
  
            palette.forEach((color) => {
              const rgb = `rgb(${color.join(",")})`;
              const hex = "#" + color.map(c => c.toString(16).padStart(2, '0')).join('');
              const box = document.createElement("div");
  
              box.style.backgroundColor = rgb;
              box.style.width = "60px";
              box.style.height = "60px";
              box.style.borderRadius = "8px";
              box.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
              box.style.margin = "10px";
              box.title = hex;
              box.setAttribute("data-hex", hex);
              box.addEventListener("click", () => {
                navigator.clipboard.writeText(hex).then(() => {
                  alert("Cor copiada: " + hex);
                });
              });
  
              paletteContainer.appendChild(box);
            });
          } catch (error) {
            console.error("Erro ao gerar a paleta:", error);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  });
  