const URL_BASE =
  "https://gist.githubusercontent.com/GustAdryan/f8f2451c8a0b9d7a18e2e278e7028d44/raw/99436f9e613d45790ab34a9d746c231cc30da4b6/products.json";

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

      if (Array.isArray(json.produtos)) {
        this.produtosCache = json.produtos;
        return this.produtosCache;
      } else {
        console.error("Estrutura inesperada:", json);
        return [];
      }
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
        this.carrinho = JSON.parse(carrinhoStr);
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
    if (produto) {
      this.carrinho.push(produto);
      this.salvarCarrinhoNoStorage();
      return true;
    } else {
      console.warn("Produto não encontrado para adicionar ao carrinho:", id);
      return false;
    }
  },

  obterCarrinho() {
    if (!this.carrinho.length) this.carregarCarrinhoDoStorage();
    return this.carrinho;
  },

  limparCarrinho() {
    this.carrinho = [];
    this.salvarCarrinhoNoStorage();
  },
};

export default API;
