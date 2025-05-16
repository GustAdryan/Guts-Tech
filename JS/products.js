const URL_BASE =
  "https://gist.githubusercontent.com/GustAdryan/a41f2e512c670b8f73f296cd9780227e/raw/1cba6da3888a935c9003bdacb824ef1804091153/gistfile1.txt";
const API = {
  async buscarProdutos() {
    try {
      const resp = await fetch(URL_BASE);
      const data = await resp.json();

      if (typeof data === "string") {
        try {
          const parsed = JSON.parse(data);
          return parsed;
        } catch (e) {
          console.error("Erro ao fazer JSON.parse em string:", e);
          return [];
        }
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  },
};

export default API;
