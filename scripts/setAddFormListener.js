import { renderComments } from "./renderComments.js";
import { loadComments, postComment } from "./api.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

export function setAddFormListener() {
  addButton.addEventListener("click", async () => {
    await postComment({ name: nameInput.value, text: textInput.value });
    await loadComments();
    renderComments();

    nameInput.value = "";
    textInput.value = "";
  });
}
