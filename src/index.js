import { products } from "../src/products.js";

const search = document.querySelector(".search-icon");
const btnCarrossel = document.querySelectorAll(".button-carrossel")
const hamburguerMenu = document.querySelector(".hamburger-menu")

hamburguerMenu.addEventListener("click", () => {
  
  const containerDepartament = document.querySelector(".container-departament")
    containerDepartament.classList.toggle("active")

    if (containerDepartament.classList.contains("active")) {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else {
      document.body.style.backgroundColor = "";
    }
 
})

search.addEventListener("click", () => {
  const inputValue = document.getElementById("search-input").value;
  if (inputValue === "") {
    alert("Digite o que você procura");
    return;
  }
  const paragraph = document.querySelector(".search-text");

  paragraph.innerHTML = `
    Você digitou:  ${inputValue}
    `;
  document.getElementById("search-input").value = "";
});

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

btnCarrossel.forEach((btn, index) => {
  btn.addEventListener("click", () => {

    btn.classList.toggle("rotated")
    
    const itemCarrossel = document.querySelectorAll(".item-carrossel")

    itemCarrossel.forEach((el, i)  => {
      if(index === i ) {
        el.classList.toggle("hidden")
      }
    }) 
  })
})

