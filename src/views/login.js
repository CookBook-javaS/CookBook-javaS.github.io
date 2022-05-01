import { login } from "../api/api.js";
import { html } from "../lib.js";
import { field } from "./common.js";

const template = (onSubmit, err, data) => html`
  <section id="login">
    <article>
      <h2>Login</h2>
      <form @submit=${onSubmit} id="loginForm">
        ${err ? html`<p class="error">${err.message}</p>` : null}
        ${field(
          "Username",
          "username",
          "text",
          data.username,
          "",
          err.username
        )}
        ${field(
          "Password",
          "password",
          "password",
          "",
          "",
          err.password
        )}
        <input type="submit" value="login" />
      </form>
    </article>
  </section>
`;
 
export function loginView(ctx) {
  //първи рендър за зареждане на логин формата
  update()
  //оттам нататък рендерираме само след submit, за да проверим дали всичко е наред с импут полетата или не и ако има нещо нередно
  //не позволяваме да се submitne докрай, хвърляме обект с грешки и error.message и визуализираме грешката на екрана и даваме на потребиталя
  //възможност да започне наново!
  function update(errors = {}, data = {}) {
    ctx.render(template(onLogin, errors, data));
  }
  //когато имаме валидация винаги си го изнасяме на отделна функция! защото при грешка трябва да рендерираме страницата
  //наново за да оцветим(да порменим хтмла) полетата, ако някъде е празно или не отговаря на иизвискванията!
  //И вече след като сме открили грешката, рендерираме подавайки на update обекта с грешката и той я оцвеява и я изписва!!
 
  async function onLogin(e) {
    e.preventDefault();
    e.target.querySelector('input').disabled = !(e.target.querySelector('input').disabled)
    const formData = new FormData(e.target);
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
   try {
    if (username == "" || password == "") {
      throw {
          message: "All fields are mandatory!",
          username: username == '' ? true : false,
          password: password == '' ? true : false
      };
    }

    e.target.reset();
    await login(username, password);
    ctx.updateNav();
    ctx.page.redirect("/");
   } catch (err) {
       update(err, {username})
   }
  }
}
