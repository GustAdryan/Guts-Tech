const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const produtosContainer = document.getElementById("produtos-promocao");

const rolarParaEsquerda = () => {
  produtosContainer.scrollBy({
    left: -300,
    behavior: "smooth",
  });
};

const rolarParaDireita = () => {
  produtosContainer.scrollBy({
    left: 300,
    behavior: "smooth",
  });
};

prevButton.addEventListener("click", rolarParaEsquerda);
nextButton.addEventListener("click", rolarParaDireita);

produtosContainer.addEventListener("mouseover", () => {
  produtosContainer.style.cursor = "grab";
});
produtosContainer.addEventListener("mouseout", () => {
  produtosContainer.style.cursor = "default";
});
