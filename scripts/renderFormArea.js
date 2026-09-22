import { state } from "./state.js";
import { setAddFormListener } from "./setAddFormListener.js";
import { showLoginPage } from "./renderLogin.js";

const formArea = document.querySelector(".form-area");

export function renderFormArea() {
  if (state.token) {
    formArea.innerHTML = `
      <div class="add-form">
        <input type="text" class="add-form-name" value="${state.userName}" readonly />
        <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>
      <div class="add-form-loader" style="display: none;">Комментарий добавляется...</div>
    `;
    setAddFormListener();
  } else {
    formArea.innerHTML = `
      <div class="add-form-link">
        Чтобы добавить комментарий,
        <a href="#" class="login-link">авторизуйтесь</a>
      </div>
    `;
    document.querySelector(".login-link").addEventListener("click", (event) => {
      event.preventDefault();
      showLoginPage();
    });
  }
}
