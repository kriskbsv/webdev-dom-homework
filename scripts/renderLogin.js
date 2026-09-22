import { state } from "./state.js";
import { loginUser, registerUser, loadComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { renderFormArea } from "./renderFormArea.js";

const commentsPage = document.querySelector(".comments-page");
const loginPage = document.querySelector(".login-page");

export function showLoginPage() {
  commentsPage.style.display = "none";
  loginPage.style.display = "block";
  renderLoginForm();
}

function showCommentsPage() {
  loginPage.style.display = "none";
  commentsPage.style.display = "block";
}


function onLoginSuccess(user) {
  state.token = user.token;
  state.userName = user.name;
  return loadComments(state.token).then(() => {
    showCommentsPage();
    renderComments();
    renderFormArea();
  });
}


function renderLoginForm() {
  loginPage.innerHTML = `
    <div class="login-form">
      <h2 class="login-form-title">Вход</h2>
      <input type="text" class="login-form-login" placeholder="Логин" />
      <input type="password" class="login-form-password" placeholder="Пароль" />
      <div class="login-form-row">
        <button class="login-form-button">Войти</button>
      </div>
      <div class="login-form-switch">
        Нет аккаунта? <a href="#" class="register-link">Зарегистрироваться</a>
      </div>
    </div>
  `;

  const loginInput = document.querySelector(".login-form-login");
  const passwordInput = document.querySelector(".login-form-password");
  const loginButton = document.querySelector(".login-form-button");

  loginButton.addEventListener("click", () => {
    loginUser({ login: loginInput.value, password: passwordInput.value })
      .then((user) => onLoginSuccess(user))
      .catch((error) => {
        if (error.message === "Неверные данные") {
          alert("Неверный логин или пароль");
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      });
  });

  document.querySelector(".register-link").addEventListener("click", (event) => {
    event.preventDefault();
    renderRegisterForm();
  });
}


function renderRegisterForm() {
  loginPage.innerHTML = `
    <div class="login-form">
      <h2 class="login-form-title">Регистрация</h2>
      <input type="text" class="register-form-login" placeholder="Логин" />
      <input type="text" class="register-form-name" placeholder="Имя" />
      <input type="password" class="register-form-password" placeholder="Пароль" />
      <div class="login-form-row">
        <button class="register-form-button">Зарегистрироваться</button>
      </div>
      <div class="login-form-switch">
        Уже есть аккаунт? <a href="#" class="login-link-back">Войти</a>
      </div>
    </div>
  `;

  const loginInput = document.querySelector(".register-form-login");
  const nameInput = document.querySelector(".register-form-name");
  const passwordInput = document.querySelector(".register-form-password");
  const registerButton = document.querySelector(".register-form-button");

  registerButton.addEventListener("click", () => {
    registerUser({
      login: loginInput.value,
      name: nameInput.value,
      password: passwordInput.value,
    })
      .then((user) => onLoginSuccess(user))
      .catch(() => {
        alert("Не получилось зарегистрироваться, проверьте данные");
      });
  });

  document.querySelector(".login-link-back").addEventListener("click", (event) => {
    event.preventDefault();
    renderLoginForm();
  });
}
