import UI from "./ui.js";
import Kart from "./kart.js";

document.addEventListener("DOMContentLoaded", () => {
  UI.renderizarProdutos();
  Kart.init();
});
