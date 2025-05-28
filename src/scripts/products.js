const URL_BASE = "http://localhost:3000/produtos";

const CARRINHO_STORAGE_KEY = "meu_carrinho";

const API = {
  produtosCache: null,
  carrinho: [],

  async carregarProdutos() {
    if (this.produtosCache) return this.produtosCache;

    try {
      const resp = await fetch(URL_BASE);
      const data = await resp.json();
      const json = typeof data === "string" ? JSON.parse(data) : data;

      if (Array.isArray(json)) {
        this.produtosCache = json;
      } else if (Array.isArray(json.produtos)) {
        this.produtosCache = json.produtos;
      } else {
        console.error("Estrutura inesperada de resposta:", json);
        this.produtosCache = [];
      }
      return this.produtosCache;
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      return [];
    }
  },

  async buscarProdutos() {
    return await this.carregarProdutos();
  },

  async buscarProdutosPorId(id) {
    const produtos = await this.carregarProdutos();
    return produtos.find((item) => item.id === id) || null;
  },

  carregarCarrinhoDoStorage() {
    const carrinhoStr = localStorage.getItem(CARRINHO_STORAGE_KEY);
    if (carrinhoStr) {
      try {
        const parsed = JSON.parse(carrinhoStr);

        this.carrinho = parsed.filter(
          (item) =>
            item &&
            item.produto &&
            typeof item.produto.id === "string" &&
            typeof item.produto.preco === "number" &&
            typeof item.quantidade === "number"
        );
      } catch {
        this.carrinho = [];
      }
    } else {
      this.carrinho = [];
    }
  },

  salvarCarrinhoNoStorage() {
    localStorage.setItem(CARRINHO_STORAGE_KEY, JSON.stringify(this.carrinho));
  },

  async adicionarAoCarrinho(id) {
    if (!this.carrinho.length) this.carregarCarrinhoDoStorage();

    const produto = await this.buscarProdutosPorId(id);
    if (!produto) {
      console.warn("Produto não encontrado para adicionar ao carrinho:", id);
      return false;
    }

    const itemIndex = this.carrinho.findIndex((item) => item.produto.id === id);

    if (itemIndex !== -1) {
      this.carrinho[itemIndex].quantidade += 1;
    } else {
      this.carrinho.push({ produto, quantidade: 1 });
    }

    this.salvarCarrinhoNoStorage();
    return true;
  },

  obterCarrinho() {
    if (!this.carrinho.length) this.carregarCarrinhoDoStorage();
    return this.carrinho;
  },

  removerItemCarrinho(id) {
    if (!this.carrinho.length) this.carregarCarrinhoDoStorage();

    this.carrinho = this.carrinho.filter((item) => item.produto.id !== id);
    this.salvarCarrinhoNoStorage();
  },

  diminuirQuantidade(id) {
    if (!this.carrinho.length) this.carregarCarrinhoDoStorage();

    const itemIndex = this.carrinho.findIndex((item) => item.produto.id === id);

    if (itemIndex !== -1) {
      if (this.carrinho[itemIndex].quantidade > 1) {
        this.carrinho[itemIndex].quantidade -= 1;
      } else {
        this.carrinho.splice(itemIndex, 1);
      }
      this.salvarCarrinhoNoStorage();
    }
  },

  limparCarrinho() {
    this.carrinho = [];
    this.salvarCarrinhoNoStorage();
  },
};

export default API;
