import { loadComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { setAddFormListener } from "./setAddFormListener.js";

const commentsLoader = document.querySelector(".comments-loader");


commentsLoader.style.display = "block";

loadComments()
  .then(() => {
    renderComments();
  })
  .finally(() => {
    commentsLoader.style.display = "none";
  });

setAddFormListener();
