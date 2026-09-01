import { renderComments } from "./renderComments.js";
import { setAddFormListener } from "./setAddFormListener.js";
import { loadComments } from "./api.js";

async function initApp() {
  await loadComments();
  renderComments();
  setAddFormListener();
}

initApp();
