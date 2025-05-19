import API from "./products.js";

const UI = {
  async renderizarProdutos() {
    try {
      const produtos = await API.buscarProdutos(); // <-- Corrigido: acessar diretamente a lista

      const secaoPromocao = document.querySelector("#produtos-promocao");
      const secaoNormais = document.querySelector("#produtos");

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
  containerProduto.classList.add("produto-container");

  const produtoCard = document.createElement("div");
  produtoCard.classList.add("produto");
  produtoCard.setAttribute("id", produto.id);

  const img = document.createElement("img");
  img.classList.add("produtoImg");
  img.src = produto.imagem;
  img.alt = produto.nome;
  img.onerror = () => {
    img.src = "imagem-padrao.png";
  };

  const nome = document.createElement("h2");
  nome.classList.add("produtoNome");
  nome.textContent = produto.nome;

  const precoDiv = document.createElement("div");
  precoDiv.classList.add("produtoPreco");

  if (produto.desconto) {
    const precoOriginal = document.createElement("span");
    precoOriginal.classList.add("preco-original");
    precoOriginal.textContent = `R$ ${(produto.preco * 1.2).toFixed(2)}`;

    const precoDesconto = document.createElement("span");
    precoDesconto.classList.add("preco-desconto");
    precoDesconto.textContent = `R$ ${produto.preco.toFixed(2)}`;

    precoDiv.appendChild(precoOriginal);
    precoDiv.appendChild(precoDesconto);

    const parcelamento = document.createElement("p");
    parcelamento.classList.add("produto-parcelamento");
    parcelamento.textContent = "Parcelamento de até 10x sem juros";
    precoDiv.appendChild(parcelamento);
  } else {
    const precoNormal = document.createElement("span");
    precoNormal.classList.add("preco-normal");
    precoNormal.textContent = `R$ ${produto.preco.toFixed(2)}`;
    precoDiv.appendChild(precoNormal);
  }

  const botao = document.createElement("button");
  botao.classList.add("comprar");
  botao.setAttribute("id", produto.id);
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
