// Selecionando os botões e o container dos produtos
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const produtosContainer = document.getElementById("produtos-promocao");

// Função para mover o carrossel para a esquerda
const rolarParaEsquerda = () => {
  produtosContainer.scrollBy({
    left: -300, // Ajuste a distância conforme necessário
    behavior: "smooth",
  });
};

// Função para mover o carrossel para a direita
const rolarParaDireita = () => {
  produtosContainer.scrollBy({
    left: 300, // Ajuste a distância conforme necessário
    behavior: "smooth",
  });
};

// Adicionando os eventos de clique aos botões
prevButton.addEventListener("click", rolarParaEsquerda);
nextButton.addEventListener("click", rolarParaDireita);

// Opcional: Adicionando comportamento para scroll contínuo quando o mouse passar sobre a área do carrossel
produtosContainer.addEventListener("mouseover", () => {
  produtosContainer.style.cursor = "grab";
});
produtosContainer.addEventListener("mouseout", () => {
  produtosContainer.style.cursor = "default";
});
