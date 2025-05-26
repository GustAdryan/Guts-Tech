const toggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".header-nav-list");
const body = document.body;

toggle.addEventListener("click", () => {
  navList.classList.toggle("active");
  body.classList.toggle("menu-open");
});
