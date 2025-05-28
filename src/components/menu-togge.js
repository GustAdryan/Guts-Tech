document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("menu-list");

  toggle.addEventListener("click", () => {
    navList.classList.toggle("-translate-x-full");
    navList.classList.toggle("translate-x-0");
  });
});
