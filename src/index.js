import { products } from "../src/products.js";

const search = document.querySelector(".search-icon");
const btnCarrossel = document.querySelectorAll(".button-acordeon");
const iconHamburguer = document.getElementById("hamburguer");
const departamentLinks = document.querySelectorAll(".departament-links");
const subMenuContainer = document.querySelector(".container-sub-menu");
const mediaQuery = window.matchMedia("(max-width: 608px)");
const category = document.querySelector(".category");
const containerMenuHamburguer = document.querySelector(
  ".container-menu-hamburguer"
);

//Função pra pegar o que foi digitado no input e mostrar na tela
function handleSearch() {
  const inputValue = document.getElementById("search-input").value;

  if (inputValue === "") {
    alert("Digite o que você procura");
    return;
  }

  const paragraph = document.querySelector(".search-text");
  paragraph.innerHTML = `Você digitou: ${inputValue}`;
  document.getElementById("search-input").value = "";
}

// Exibe o submenu quando o mouse passa sobre o botão hamburguer
function setupHamburguerMenuHover() {
  containerMenuHamburguer.addEventListener("mouseenter", () => {
    subMenuContainer.classList.toggle("show");
  });

  containerMenuHamburguer.addEventListener("mouseleave", () => {
    subMenuContainer.classList.remove("show");
  });
}

// Ativa o comportamento de exibir/esconder o submenu de categorias ao passar o mouse nos departamentos
function handleDepartmentHover() {
  departamentLinks.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      category.classList.toggle("show");
    });

    item.addEventListener("mouseleave", () => {
      category.classList.remove("show");
    });
  });
}

//Aqui a função para o menu aparecer e desaparecer no mobile
function toggleHamburguerMenu() {
  iconHamburguer.addEventListener("click", () => {
    const overlay = document.querySelector(".overlay")
    const departamentContainer = document.querySelector(".container-departament" );
    departamentContainer.classList.toggle("show");
    overlay.classList.toggle("hidden")

    iconHamburguer.classList.toggle("fa-bars");
    iconHamburguer.classList.toggle("fa-times");
  });
}

if (mediaQuery.matches) {
  toggleHamburguerMenu();
}

//Função do carrossel

function initCarousels() {
  document.querySelectorAll(".carousel-container").forEach((container) => {
    const carousel = container.querySelector(".carousel");
    const prevBtn = container.querySelector(".prevBtn");
    const nextBtn = container.querySelector(".nextBtn");
    let currentIndex = 0;
    const visibleCards = 4;

    function renderProducts() {
      carousel.innerHTML = "";

      products.forEach((product) => {
        const item = document.createElement("div");
        item.className = "carousel-item";
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <span>Novo</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="price-container">
            <div>
              <p class="price-line">${product.price}</p>
              <p class="discount">${product.discount}</p>
            </div>
            <p class="offer">${product.offer}</p>
          </div>
          <p class="installments">${product.installments}</p>
          <button class="buy-button">Comprar</button>
        `;
        carousel.appendChild(item);
      });

      updateCarousel();
    }

    function updateCarousel() {
      const itemWidth = 250 + 16;
      const offset = currentIndex * itemWidth;
      carousel.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener("click", () => {
      if (currentIndex < products.length - visibleCards) {
        currentIndex += 1;
        updateCarousel();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex -= 1;
        updateCarousel();
      }
    });

    renderProducts();
  });
}

//Função para abrir e fechar o acordeon do footer
function initVerticalCarrosselButtons() {
  btnCarrossel.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("rotated");

      const itemCarrossel = document.querySelectorAll(".item-acordeon");

      itemCarrossel.forEach((el, i) => {
        if (index === i) {
          el.classList.toggle("hidden");
        }
      });
    });
  });
}

search.addEventListener("click", handleSearch);
handleDepartmentHover();
setupHamburguerMenuHover();
initCarousels();
initVerticalCarrosselButtons();
