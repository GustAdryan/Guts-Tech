import API from "./products.js";

const CartUI = {
  container: null,
  totalElement: null,
  botaoLimpar: null,

  init() {
    this.container = document.querySelector("#carrinho-itens");
    this.totalElement = document.querySelector("#total-carrinho");
    this.botaoLimpar = document.querySelector("#limpar-carrinho");

    this.botaoLimpar?.addEventListener("click", () => {
      API.limparCarrinho();
      this.renderizarCarrinho();
    });

    this.renderizarCarrinho();
  },

  renderizarCarrinho() {
    const itens = API.obterCarrinho();

    this.container.innerHTML = "";

    if (itens.length === 0) {
      this.container.innerHTML = "<p>Seu carrinho está vazio.</p>";
      this.totalElement.textContent = "R$ 0,00";
      return;
    }

    let total = 0;

    itens.forEach((produto, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("carrinho-item");

      itemDiv.innerHTML = `
        <img src="${produto.imagem}" alt="${
        produto.nome
      }" class="carrinho-img" onerror="this.src='imagem-padrao.png'"/>
        <div class="carrinho-dados">
          <h3>${produto.nome}</h3>
          <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
        </div>
      `;

      this.container.appendChild(itemDiv);
      total += produto.preco;
    });

    this.totalElement.textContent = `R$ ${total.toFixed(2)}`;
  },
};

document.addEventListener("DOMContentLoaded", () => CartUI.init());

export default CartUI;
