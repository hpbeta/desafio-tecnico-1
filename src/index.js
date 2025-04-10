import { products } from "../src/products.js";

const search = document.querySelector(".search-icon");
const btnCarrossel = document.querySelectorAll(".button-carrossel");
const hamburguerMenu = document.querySelector(".hamburger-menu");
const iconHamburguer = document.getElementById("hamburguer");
const subMenu = document.querySelector(".sub-menu");
const containerCategory = document.querySelector(".container-category");
const departamentLinks = document.querySelectorAll(".departament-links");
const subMenuContainer = document.querySelector(".container-sub-menu");

departamentLinks.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const category = document.querySelector(".category");

    category.classList.toggle("show");
    subMenuContainer.classList.remove("hidden");
  });
});

iconHamburguer.addEventListener("mouseenter", () => {
  subMenuContainer.classList.toggle("hidden");
  containerCategory.classList.remove("hidden");
});

subMenu.addEventListener("mouseenter", () => {
  containerCategory.classList.add("hidden");
});

function toggleHamburguerMenu() {
  const containerDepartament = document.querySelector(".container-departament");
  containerDepartament.classList.toggle("active");

  document.body.style.backgroundColor = containerDepartament.classList.contains(
    "active"
  )
    ? "rgba(0, 0, 0, 0.5)"
    : "";
}

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

      const itemCarrossel = document.querySelectorAll(".item-carrossel");

      itemCarrossel.forEach((el, i) => {
        if (index === i) {
          el.classList.toggle("hidden");
        }
      });
    });
  });
}

search.addEventListener("click", handleSearch);
hamburguerMenu.addEventListener("click", toggleHamburguerMenu);

initCarousels();
initVerticalCarrosselButtons();
