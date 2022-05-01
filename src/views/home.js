import { getRecipes } from "../api/recipes.js";
import { html, until } from "../lib.js";
import { spinner } from "./common.js";

const template = (recipePromise) => html`
<section id="home">
  <div class="hero"><h2>Welcome to my Cookbook!</h2></div>
  <header class="section-title">Recently added recipes</header>
  <div class="recent-recipes">
      ${until(recipePromise, spinner())}
  </div>
  <footer class="section-title">
<p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
  </footer>
</section>

`

const recipePreview = (recipe) => html`
<a class="card" href="/details/${recipe.objectId}">
    <article class="recent">
        <div class="recent-preview"><img src=${recipe.img}></div>
        <div class="recent-title">${recipe.name}</div>
    </article>
</a>
`

export function homeView(ctx) {
    ctx.render(template(loadRecipes()))
}
async function loadRecipes() {
    const recipes = (await getRecipes()).results
    if (recipes.length == 0) {
        return html`<p>No recipes found. Be the first to make one! </p>`
    }else {
        return recipes.reduce((a, c) => {
            if (a.length >= 1 && a.length <= 3) {
                a.push(html`<div class="recent-space"></div>`)
            }
            a.push(recipePreview(c))
            return a
        },[])
    }

}
