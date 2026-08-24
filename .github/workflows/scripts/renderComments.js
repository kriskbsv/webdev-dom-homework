import { comments } from "./comments.js";
import { escapeHtml } from "./escapeHtml.js";
import { setLikeListeners } from "./setLikeListeners.js";
import { setCommentListeners } from "./setCommentListeners.js";

const commentsList = document.querySelector(".comments");

export function renderComments() {
  const commentsHtml = comments
    .map((comment, index) => {
      const likeButtonClass = comment.isLiked
        ? "like-button -active-like"
        : "like-button";

      const safeName = escapeHtml(comment.name);
      const safeText = escapeHtml(comment.text);

      return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${safeName}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${safeText}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="${likeButtonClass}" data-index="${index}"></button>
            </div>
          </div>
        </li>
      `;
    })
    .join("");

  commentsList.innerHTML = commentsHtml;

  setLikeListeners();
  setCommentListeners();
}
