function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const observer = new IntersectionObserver(
  async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio === 1) {
        entry.target.classList.add("appear-animation");
        observer.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 1.0,
  }
);

document
  .querySelectorAll(".container-apper")
  .forEach((el) => observer.observe(el));

function abrir() {
  document.getElementById("form").style.display = "";
  document.body.style.overflow = 'hidden';
}

function fechar() {
  document.getElementById("form").style.display = "none";
  document.body.style.overflow = '';
}

let menuAberto = false;

const button = document.getElementById('btn-navbar');
if (button) button.addEventListener("click", abrir);
const buttonFechar = document.getElementById('btn-fechar');
if (buttonFechar) buttonFechar.addEventListener("click", fechar);

const buttonHamburguer = document.getElementById('btn-hamburguer');
console.log(buttonHamburguer);
const menu = document.getElementById('menu');
const iconeMenu = document.getElementById('iconeMenu');

function abrirMenu() {
  console.log('clicou');
  if (!menuAberto) {
    menuAberto = true;
    menu.className = "menu-aberto";
    iconeMenu.style.transform = 'rotate(90deg)';

  } else {
    menuAberto = false;
    menu.className = "hidden";
    iconeMenu.style.transform = 'rotate(0deg)';
  }

}

if (buttonHamburguer) {
  buttonHamburguer.addEventListener('click', abrirMenu);
}

// Expor globalmente para onclick inline
window.abrirMenu = abrirMenu;