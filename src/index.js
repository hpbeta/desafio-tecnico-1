import { products } from "../src/products.js";

const search = document.querySelector(".search-icon");
const btnCarrossel = document.querySelectorAll(".button-acordeon");
const iconHamburguer = document.getElementById("hamburguer");
const departamentLinks = document.querySelectorAll(".departament-links");
const subMenuContainer = document.querySelector(".container-sub-menu");
const mediaQuery = window.matchMedia("(max-width: 608px)");
const category = document.querySelector(".category");
const containerMenuHamburguer = document.querySelector(".container-menu-hamburguer")

//quando passa o mouse em cima do departamento abre um sub-menu categoria
departamentLinks.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    category.classList.toggle("show");
  });

  //Aqui quando eu tiro o mouse de cima o sub menu some
  item.addEventListener("mouseleave", () => {
    category.classList.remove("show")
  })
});


//Quando passa o mouse em cima do menu-hamburguer abre um submenu
containerMenuHamburguer.addEventListener("mouseenter", () => {
  subMenuContainer.classList.toggle("show");
});

//Quando tira o mouse o submenu sai
containerMenuHamburguer.addEventListener("mouseleave", () => {
  subMenuContainer.classList.remove("show");
});


//Aqui a função para o menu aparecer e desaparecer no mobile
function toggleHamburguerMenu() {
  iconHamburguer.addEventListener("click", () => {
    const departamentContainer = document.querySelector(
      ".container-departament"
    );
    departamentContainer.classList.toggle("show");
  });
}

if (mediaQuery.matches) {
  toggleHamburguerMenu();
}

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
          <h3>${product.name}</h3>
          <div class="price-container">
            <div>
              <p class="price-line">${product.price}</p>
              <p>${product.discount}</p>
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

initCarousels();
initVerticalCarrosselButtons();
