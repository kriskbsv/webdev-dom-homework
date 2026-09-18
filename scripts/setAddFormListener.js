import { loadComments, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");
const addForm = document.querySelector(".add-form");
const addFormLoader = document.querySelector(".add-form-loader");

export function setAddFormListener() {
  addButton.addEventListener("click", () => {
    addForm.style.display = "none";
    addFormLoader.style.display = "block";

    postComment({ name: nameInput.value, text: textInput.value })
      .then(() => loadComments())
      .then(() => {
        renderComments();
        nameInput.value = "";
        textInput.value = "";
      })
      .finally(() => {
        addForm.style.display = "";
        addFormLoader.style.display = "none";
      });
  });
}
