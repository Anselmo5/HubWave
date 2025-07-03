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


document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".scroll-link");
  links.forEach(links =>{
    links.addEventListener("click", (event) => {
      event.preventDefault()
      const linkId = links.getAttribute("href")
      const ElementId = document.querySelector(linkId)
      if(linkId){
        ElementId.scrollIntoView({
          behavior:"smooth",
          block:"start"
        })
      }
    })
  })
})

document.addEventListener("DOMContentLoaded", () => {
  function updateGridColumns() {
    const grids = document.querySelectorAll('.alingSectionColor');
    if (!grids.length) return;
    let columns = 5;
    if (window.innerWidth < 1200) columns = 3;
    if (window.innerWidth < 900) columns = 2;
    if (window.innerWidth < 600) columns = 1;
    grids.forEach(grid => {
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    });
  }

  window.addEventListener('resize', updateGridColumns);
  updateGridColumns();
});

document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.mobile-menu-button');
  if (!menuBtn) {
    menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-button';
    menuBtn.innerHTML = '&#9776;';
    const nav = document.querySelector('.alingNav');
    if (nav) nav.appendChild(menuBtn);
  }
  const links = document.querySelector('.alingLinks');
  menuBtn.addEventListener('click', () => {
    links.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (
      !links.contains(e.target) &&
      !menuBtn.contains(e.target) &&
      links.classList.contains('active')
    ) {
      links.classList.remove('active');
      menuBtn.classList.remove('active');
    }
  });
  document.querySelectorAll('.navLinks a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        links.classList.remove('active');
        menuBtn.classList.remove('active');
      }
    });
  });
});



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

const TextCor = () => {
  const hex = "#" + color.map(c => c.toString(16).padStart(2, '0')).join('');
  const corTexto = document.getElementById('CorTexto');
  corTexto.textContent = hex;
  corTexto.style.color = hex; 
};

function RedirectRepo() {
  window.location.href = "https://github.com/Anselmo5/HubWave"
}

function RedirectLoading() {
  const redirectLoading = document.getElementById("RedirectLoading");
  if (redirectLoading) {
    redirectLoading.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  RedirectLoading();
});