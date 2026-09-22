import { loadComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { setAddFormListener } from "./setAddFormListener.js";

const commentsLoader = document.querySelector(".comments-loader");

commentsLoader.style.display = "block";

loadComments()
  .then(() => {
    renderComments();
  })
  .catch((error) => {
    if (error.message === "Ошибка сервера") {
      alert("Сервер сломался, попробуй позже");
    } else {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    }
  })
  .finally(() => {
    commentsLoader.style.display = "none";
  });

setAddFormListener();
