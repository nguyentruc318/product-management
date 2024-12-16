console.log("Chạy được");
const buttonStatus = document.querySelectorAll("button[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
const formSearch = document.getElementById("form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    const keyword = e.target.elements.keyword.value;
    e.preventDefault();
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
const pagination = document.querySelectorAll("button[button-pagination]");

if (pagination.length > 0) {
  let url = new URL(window.location.href);
  pagination.forEach((button) => {
    button.addEventListener("click", () => {
      const currentPage = button.getAttribute("button-pagination");
      url.searchParams.set("page", currentPage);
      window.location.href = url.href;
    });
  });
}
