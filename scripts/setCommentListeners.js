import { comments } from "./comments.js";

const textInput = document.querySelector(".add-form-text");

export function setCommentListeners() {
  const commentElements = document.querySelectorAll(".comment");

  commentElements.forEach((commentElement) => {
    commentElement.addEventListener("click", () => {
      const index = Number(commentElement.dataset.index);
      const comment = comments[index];

      textInput.value = `> ${comment.text}\n${comment.name}, `;
      textInput.focus();
    });
  });
}
