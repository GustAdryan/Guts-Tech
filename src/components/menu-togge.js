document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("menu-list");
  const body = document.body;

  toggle.addEventListener("click", () => {
    navList.classList.toggle("-translate-x-full");
    navList.classList.toggle("translate-x-0");

    // Se o menu estiver visível
    if (!navList.classList.contains('-translate-x-full')){
      body.classList.add('no-scroll');
    }
    else{
      body.classList.remove("no-scroll"); // libera scroll
    }
  });
});
