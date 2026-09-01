import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

export function setAddFormListener() {
  addButton.addEventListener("click", () => {
    const now = new Date();
    const fullDate =
      now.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }) +
      " " +
      now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });

    comments.push({
      name: nameInput.value,
      date: fullDate,
      text: textInput.value,
      likes: 0,
      isLiked: false,
    });

    renderComments();

    nameInput.value = "";
    textInput.value = "";
  });
}
