import API from "./products.js";

const Kart = {
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

    if (!this.container) return;

    this.container.innerHTML = "";

    if (!Array.isArray(itens) || itens.length === 0) {
      this.container.innerHTML = "<p>Seu carrinho está vazio.</p>";
      this.totalElement.textContent = "R$ 0,00";
      return;
    }

    let total = 0;

    itens.forEach(({ produto, quantidade }) => {
      if (!produto || typeof produto.preco !== "number") return;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add(
        "flex",
        "items-center",
        "justify-between",
        "border-b",
        "border-gray-300",
        "py-2"
      );

      itemDiv.innerHTML = `
        <div class="flex items-center gap-4">
          <img src="${produto.imagem}" alt="${
        produto.nome
      }" class="w-16 h-16 object-contain" onerror="this.src='imagem-padrao.png'" />
          <div>
            <h3 class="font-semibold">${produto.nome}</h3>
            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
            <p>Quantidade: ${quantidade}</p>
          </div>
        </div>
        <button
          aria-label="Remover ${produto.nome} do carrinho"
          class="text-red-600 font-bold hover:text-red-800"
          data-produto-id="${produto.id}"
        >
          &times;
        </button>
      `;

      const btnRemover = itemDiv.querySelector("button");
      btnRemover.addEventListener("click", () => {
        API.removerItemCarrinho(produto.id);
        this.renderizarCarrinho();
      });

      this.container.appendChild(itemDiv);

      total += produto.preco * quantidade;
    });

    this.totalElement.textContent = `R$ ${total.toFixed(2)}`;
  },
};

export default Kart;
