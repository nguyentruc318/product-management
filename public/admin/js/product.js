// Change status
console.log("oke");
console.log("hehe");
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
console.log(buttonChangeStatus);

if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.getElementById("form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  console.log(path);
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      let statusChange = status == "available" ? "unavailable" : "available";
      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      console.log(action);
      formChangeStatus.setAttribute("action", action);
      formChangeStatus.submit();
    });
  });
}
// checkbox multi
const checkboxMulti = document.querySelector("[checkebox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name=select-all]");
  const inputsId = checkboxMulti.querySelectorAll("input[name=id]");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });
  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name=id]:checked"
      );
      if (countChecked.length === inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// form change multi
const formChangeMulti = document.getElementById("form-change-multi");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkebox-multi]");
    const inputIsChecked = checkboxMulti.querySelectorAll(
      "input[name=id]:checked"
    );
    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");
      if (!confirmDelete) {
        return;
      }
    }
    if (inputIsChecked.length > 0) {
      let ids = [];
      if (typeChange == "change-position") {
        const position = input
          .closest("tr")
          .querySelector("input[name=position]").value;
        ids.push(`${id}-${position}`);
        console.log(ids);
      } else {
        inputIsChecked.forEach((input) => {
          ids.push(input.value);
        });
      }

      formChangeMulti.querySelector("input[name=ids]").value = ids.join(",");
      formChangeMulti.submit();
    }
  });
}
// delete all

// delete
const buttonDelete = document.querySelectorAll("[button-delete]");
console.log(buttonDelete.length);
if (buttonDelete.length > 0) {
  const formDelete = document.getElementById("form-delete-product");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa không?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        console.log(id);
        const path = formDelete.getAttribute("data-path");
        const action = `${path}/${id}?_method=DELETE`;
        console.log(action);
        formDelete.setAttribute("action", action);
        formDelete.submit();
      }
    });
  });
}
// show alert
const alert = document.querySelector("[show-alert]");
if (alert) {
  const time = alert.getAttribute("data-time");
  const closeAlert = alert.querySelector("[close-alert]");
  setTimeout(() => {
    alert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    alert.classList.add("alert-hidden");
  });
}
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
