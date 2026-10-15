// 햄버거 메뉴 클릭
let hamburgerBtn = document.querySelector(".hamburger");
let menu = document.querySelector(".menu");
// 메뉴 열기 / 닫기
hamburgerBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});
// 화면 변경시 메뉴 닫기
window.addEventListener("resize", () => {
  menu.classList.remove("show");
});
