// transição do background para a tela home

const transitionBackground = document.getElementById("transitionBackground");

transitionBackground.addEventListener("click",() =>{
    transitionBackground.classList.add("fade-out")
    setTimeout(() =>{
        window.location.href = "home.html"
    }, 1000)
})

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("preload");
  });
  

//   funcao para fazer ulound das imagens

  const input = document.getElementById('uploadImage');
  const previewImg = document.getElementById('previewImg');
  const paletteContainer = document.getElementById('colorPalette');
  const colorThief = new ColorThief();

  input.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;

      // Espera a imagem carregar antes de extrair as cores
      previewImg.onload = () => {
        if (previewImg.complete) {
          const palette = colorThief.getPalette(previewImg, 5);
          paletteContainer.innerHTML = '';

          palette.forEach(color => {
            const box = document.createElement('div');
            const rgb = `rgb(${color.join(',')})`;
            box.style.backgroundColor = rgb;
            box.style.width = '50px';
            box.style.height = '50px';
            box.style.display = 'inline-block';
            box.style.margin = '0 5px';
            box.title = rgb;
            paletteContainer.appendChild(box);
          });
        }
      };
    };

    reader.readAsDataURL(file);
  });

