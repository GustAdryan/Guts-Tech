const URL_BASE = "http://localhost:3000/produtos";

/* 
    ao programar use a url http://localhost:3000/produtos
    basta da abrir o terminal e digitar npm install e depois rodar o comando " cd "guts-tech vite" " "cd backend" e por fim "npx json-server products.json"
  */

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

      // Suportar tanto objeto com chave 'produtos' quanto array raiz
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
