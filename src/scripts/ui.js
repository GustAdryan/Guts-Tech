import API from "./products.js";

const UI = {
  async renderizarProdutos() {
    try {
      const produtos = await API.buscarProdutos();

      const secaoPromocao = document.querySelector("#produtos-promocao");
      const secaoNormais = document.querySelector("#produtos");

      secaoPromocao.innerHTML = "";
      secaoNormais.innerHTML = "";

      produtos.forEach((produto) => {
        const card = criarProdutoCard(produto);
        if (produto.desconto) {
          secaoPromocao.appendChild(card);
        } else {
          secaoNormais.appendChild(card);
        }
      });
    } catch (error) {
      console.error("Erro ao renderizar os produtos:", error);
    }
  },
};

function criarProdutoCard(produto) {
  const containerProduto = document.createElement("section");
  containerProduto.classList.add(
    "produto-container",
    "p-4",
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "flex",
    "flex-col",
    "items-center",
    "w-64",
    "h-96",
    "mx-auto",
    "hover:shadow-xl",
    "transition-shadow",
    "duration-300",
    "mb-6"
  );

  const produtoCard = document.createElement("div");
  produtoCard.classList.add(
    "produto",
    "w-full",
    "h-full",
    "flex",
    "flex-col",
    "justify-between"
  );
  produtoCard.setAttribute("id", produto.id);

  const img = document.createElement("img");
  img.classList.add("produtoImg", "w-full", "h-40", "object-contain", "mb-4");
  img.src = produto.imagem;
  img.alt = produto.nome;
  img.addEventListener("error", () => {
    img.src = "imagem-padrao.png";
  });

  const nome = document.createElement("h2");
  nome.classList.add(
    "produtoNome",
    "text-lg",
    "font-semibold",
    "mb-2",
    "text-center",
    "truncate"
  );
  nome.textContent = produto.nome;

  const precoDiv = document.createElement("div");
  precoDiv.classList.add("produtoPreco", "mb-4", "text-center");

  if (produto.desconto) {
    const precoOriginal = document.createElement("span");
    precoOriginal.classList.add(
      "preco-original",
      "line-through",
      "text-gray-400",
      "mr-2",
      "text-sm"
    );
    precoOriginal.textContent = `R$ ${(produto.preco * 1.2).toFixed(2)}`;

    const precoDesconto = document.createElement("span");
    precoDesconto.classList.add(
      "preco-desconto",
      "text-red-600",
      "font-bold",
      "text-lg"
    );
    precoDesconto.textContent = `R$ ${produto.preco.toFixed(2)}`;

    precoDiv.appendChild(precoOriginal);
    precoDiv.appendChild(precoDesconto);

    const parcelamento = document.createElement("p");
    parcelamento.classList.add(
      "produto-parcelamento",
      "text-xs",
      "text-gray-500",
      "mt-1"
    );
    parcelamento.textContent = "Parcelamento de até 10x sem juros";
    precoDiv.appendChild(parcelamento);
  } else {
    const precoNormal = document.createElement("span");
    precoNormal.classList.add(
      "preco-normal",
      "text-gray-800",
      "font-semibold",
      "text-lg"
    );
    precoNormal.textContent = `R$ ${produto.preco.toFixed(2)}`;
    precoDiv.appendChild(precoNormal);
  }

  const botao = document.createElement("button");
  botao.classList.add(
    "comprar",
    "bg-indigo-600",
    "text-white",
    "w-full",
    "py-2",
    "rounded",
    "hover:bg-indigo-700",
    "transition-colors",
    "duration-300",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-indigo-500",
    "focus:ring-offset-2"
  );
  botao.setAttribute("data-produto-id", produto.id);
  botao.setAttribute("aria-label", `Adicionar ${produto.nome} ao carrinho`);
  botao.textContent = "Adicionar ao carrinho";

  botao.onclick = async () => {
    const sucesso = await API.adicionarAoCarrinho(produto.id);
    if (sucesso) {
      alert(`${produto.nome} foi adicionado ao carrinho!`);
    } else {
      alert("Erro ao adicionar produto ao carrinho.");
    }
  };

  produtoCard.appendChild(img);
  produtoCard.appendChild(nome);
  produtoCard.appendChild(precoDiv);
  produtoCard.appendChild(botao);

  containerProduto.appendChild(produtoCard);

  return containerProduto;
}

export default UI;
