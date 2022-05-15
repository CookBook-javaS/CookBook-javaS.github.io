import { getRecipeById } from "../api/recipes.js";
import { html, until } from "../lib.js";
import { spinner } from "./common.js";

const template = (detailsPromise) => html`
<section id="details">
${until(detailsPromise, spinner())}
</section>`

const recipeCard = (recipe) => html`
<article>
<h2>${recipe.name}</h2>
<div class="band">
  <div class="thumb"><img src=${recipe.img}></div>
  <div class="ingredients">
    <h3>Ingredients:</h3>
    <ul>
      ${(recipe.ingredients).map(i => html`<li>${i}</li>`)}
    </ul>
  </div>
</div>
<div class="description">
<h3>Preparation:</h3>
${(recipe.steps).map(i => html`<p>${i}</p>`)}
</div>
<div class="controls">
  <a class="actionLink" href="/edit/${recipe.objectId}">Edit</a>
  <a class="actionLink" href="javascript:void(0)">&#x2716; Delete</a>
</div>
</article>
`

export function detailsView(ctx) {
    ctx.render(template(loadRecipe(ctx.params.id)))
}
async function loadRecipe(id) {
    const recipe = await getRecipeById(id)

    return recipeCard(recipe)
} 