import { state } from "./state.js";
import { loadComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { renderFormArea } from "./renderFormArea.js";

const commentsLoader = document.querySelector(".comments-loader");

commentsLoader.style.display = "block";

loadComments(state.token)
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
    renderFormArea(); 
  });
