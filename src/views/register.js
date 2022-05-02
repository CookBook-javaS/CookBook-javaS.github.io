import { register } from "../api/api.js";
import { html } from "../lib.js";
import { field } from "./common.js";

const template = (onSubmit, err, data) => html`
  <section id="login">
    <article>
      <h2>Register</h2>
      <form @submit=${onSubmit} id="registerForm">
        ${err ? html`<p class="error">${err.message}</p>` : null}
        ${field("Username", "username", "text", data.username, "", err.username)}
        ${field("Email", "email", "text", data.email, "", err.email)}
        ${field("Password", "password", "password", "", "", err.password)}
        ${field("Repeat", "rePass", "password", "", "", err.repass)}
        <input type="submit" value="register" />
      </form>
    </article>
  </section>
`;
 
export function registerView(ctx) {
  update()

  function update(errors = {}, data = {}) {
    ctx.render(template(onLogin, errors, data));
  }

  async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
    const repass = formData.get('rePass').trim()
   try {
    if (username == "" || password == "" || email == "") {
      throw {
          message: "All fields are mandatory!",
          username: username == '' ? true : false,
          password: password == '' ? true : false, 
          email: email == '' ? true : false,
          repass: repass == '' ? true : false
      };
    }
    if (password != repass) {
        throw {
          message: "Passwords don't match. Please try again!",
          username: false,
          password: true,
          email: false,
          repass: true
        }
    }
    
    e.target.reset();
    await register(username, email, password);
    ctx.updateNav();
    ctx.page.redirect("/");
   } catch (err) {
       if (err.code == 202) {
        err.username = true
       }
       if (err.code == 203) {
        err.email = true
     }
       update(err, {username, email})
   }
  }
}
