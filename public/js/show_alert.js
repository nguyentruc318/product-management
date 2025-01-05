const alert = document.querySelector("[show-alert]");

if (alert) {
  const time = alert.getAttribute("data-time");
  const closeAlert = alert.querySelector("[close-alert]");
  setTimeout(() => {
    alert.classList.add("alert-hidden");
    showInfo.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    alert.classList.add("alert-hidden");
  });
}
