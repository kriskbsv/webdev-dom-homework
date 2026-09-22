import { comments } from "./comments.js";

const HOST = "https://wedev-api.sky.pro";
const API_KEY = "Кристина Кабисова";
const API_URL = `${HOST}/api/v1/${API_KEY}/comments`;

const COMMENTS_URL = `${HOST}/api/v2/${API_KEY}/comments`;
const LOGIN_URL = `${HOST}/api/user/login`;
const REGISTER_URL = `${HOST}/api/user`;

export function getComments(token) {
  return fetch(COMMENTS_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
    .then((response) => {
      if (response.status >= 500) {
        throw new Error("Ошибка сервера");
      }
      return response.json();
    })
    .then((data) =>
      data.comments.map((comment) => ({
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
      })),
    );
}

export function loadComments(token) {
  return getComments(token).then((loaded) => {
    comments.length = 0;
    comments.push(...loaded);
  });
}

export function postComment({ text, token }) {
  return fetch(COMMENTS_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Короткие данные");
    }
    if (response.status >= 500) {
      throw new Error("Ошибка сервера");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify({ login, password }),
  })
    .then((response) => {
      if (response.status === 400 || response.status === 401) {
        throw new Error("Неверные данные");
      }
      return response.json();
    })
    .then((data) => data.user); // { name, login, token, _id }
}

export function registerUser({ login, name, password }) {
  return fetch(REGISTER_URL, {
    method: "POST",
    body: JSON.stringify({ login, name, password }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Ошибка регистрации");
      }
      return response.json();
    })
    .then((data) => data.user);
}
