import { comments } from "./comments.js";

const HOST = "https://wedev-api.sky.pro";
const API_KEY = "Кристина Кабисова";
const API_URL = `${HOST}/api/v1/${API_KEY}/comments`;

export async function loadComments() {
  const response = await fetch(API_URL);
  const data = await response.json();

  const loaded = data.comments.map((comment) => ({
    name: comment.author.name,
    date: comment.date,
    text: comment.text,
    likes: comment.likes,
    isLiked: false,
  }));

  comments.length = 0;
  comments.push(...loaded);
}

export async function postComment({ name, text }) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, text }),
  });
  return response.json();
}
