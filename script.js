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
  