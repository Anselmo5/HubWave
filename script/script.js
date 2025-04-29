// transição do background para a tela home


const transitionBackground = document.getElementById("transitionBackground");
if (transitionBackground) {
  transitionBackground.addEventListener('click', () => {
    transitionBackground.classList.add("fade-out")
    console.log("fade-out")
    setTimeout(() => {
      window.location.href = "home.html"
    }, 1000)
  })

}

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("preload");
});


// document.querySelector('.transitionBackground').addEventListener('click', () => {
//   document.querySelector('.transitionBackground').classList.add('fade-out');
//   setTimeout(() => {
//       window.location.href = 'home.html';
//   }, 1000);
// });


// document.addEventListener('DOMContentLoaded', () => {
//   const transitionBackground = document.querySelector('.transitionBackground');
//   if (transitionBackground) { // boa prática: verificar se encontrou
//       transitionBackground.addEventListener('click', () => {
//           transitionBackground.classList.add('fade-out');
//           setTimeout(() => {
//               window.location.href = 'home.html';
//           }, 1000);
//       });
//   }
// });


//  Função para gerar paleta de cores por  imagem

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
                Swal.fire({
                  title: "Cor Copiada!",
                  text: `A cor ${hex} foi copiada para a área de transferência.`,
                  icon: "success",
                  draggable: true,
                  background: hex,
                  color: "#fff",
                });
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
