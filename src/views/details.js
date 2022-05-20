import { deleteRecipe, getRecipeById } from "../api/recipes.js";
import { getUserData } from "../api/util.js";
import { html, until } from "../lib.js";
import { notify } from "../middlewares/notify.js";
import { commentsView } from "./comments.js";
import { spinner } from "./common.js";

const template = (ctx, detailsPromise) => html`
<section id="details">

${until(detailsPromise, spinner())}

<div id="comments-container"> </div>

</section>`

const recipeCard = (recipe, isOwner, onEdit, onDelete) => html`
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
${isOwner ? html`<div class="controls">
  <a @click=${onEdit} class="actionLink" href="/edit/${recipe.objectId}">&#x270e; Edit</a>
  <a @click=${onDelete} class="actionLink" href="javascript:void(0)">&#x2716; Delete</a></div>` : null}
</article>
`

export function detailsView(ctx) {
    ctx.render(template(ctx, loadRecipe(ctx)))
    commentsView(ctx)
}
async function loadRecipe(ctx) {
    const recipe = await getRecipeById(ctx.params.id)
    const isOwner = getUserData() && recipe.owner.objectId == (getUserData()).id

    return recipeCard(recipe, isOwner, onEdit, onDelete)

    function onEdit() {
        
    }

   async function onDelete() {
        const choice = confirm("Are you sure you want to delete this recipe?")
        if (choice) {
            await deleteRecipe(ctx.params.id)
            notify("Recipe deleted")
            ctx.page.redirect('/catalog')
        }

    }
} 