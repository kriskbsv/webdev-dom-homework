import { comments } from "./comments.js";

const HOST = "https://wedev-api.sky.pro";
const API_KEY = "Кристина Кабисова";
const API_URL = `${HOST}/api/v1/${API_KEY}/comments`;

export function getComments() {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) =>
      data.comments.map((comment) => ({
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      })),
    );
}


export function loadComments() {
  return getComments().then((loaded) => {
    comments.length = 0;
    comments.push(...loaded);
  });
}

export function postComment({ name, text }) {
  return fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, text }),
  }).then((response) => response.json());
}
