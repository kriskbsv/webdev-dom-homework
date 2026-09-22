import { state } from "./state.js";
import { loadComments, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";

export function setAddFormListener() {
  const textInput = document.querySelector(".add-form-text");
  const addButton = document.querySelector(".add-form-button");
  const addForm = document.querySelector(".add-form");
  const addFormLoader = document.querySelector(".add-form-loader");

  addButton.addEventListener("click", () => {
    addForm.style.display = "none";
    addFormLoader.style.display = "block";

    postComment({ text: textInput.value, token: state.token })
      .then(() => loadComments(state.token))
      .then(() => {
        renderComments();
        textInput.value = "";
      })
      .catch((error) => {
        if (error.message === "Короткие данные") {
          alert("Имя и комментарий должны быть не короче 3 символов");
        } else if (error.message === "Ошибка сервера") {
          alert("Сервер сломался, попробуй позже");
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      })
      .finally(() => {
        addForm.style.display = "";
        addFormLoader.style.display = "none";
      });
  });
}
