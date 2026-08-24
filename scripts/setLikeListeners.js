import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";

function toggleLike(index) {
  const comment = comments[index];

  if (comment.isLiked) {
    comment.likes = comment.likes - 1;
    comment.isLiked = false;
  } else {
    comment.likes = comment.likes + 1;
    comment.isLiked = true;
  }

  renderComments();
}

export function setLikeListeners() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Останавливаем всплытие, чтобы клик по лайку не запускал цитирование
      event.stopPropagation();

      const index = Number(button.dataset.index);
      toggleLike(index);
    });
  });
}
