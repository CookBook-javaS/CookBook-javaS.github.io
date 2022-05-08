import { getRecipes } from "../api/recipes.js";
import { parseQuery } from "../api/util.js";
import { html, until } from "../lib.js";
import { spinner } from "./common.js";

const template = (recipePromise, onSearch, page = 1, search = '') => html`
<section id="catalog">
  <div class="sectio-title">
    <form @submit=${onSearch} id="searchForm">
      <input type="text" name="search" .value=${search}>
      <input type="submit" value="Search">
    </form>
  </div>

  <header class="section-title">
    Page 2 of 3
    <a class="pager" href="/catalog/1">&lt; Prev</a>
    <a class="pager" href="/catalog/3">Next &gt;</a>
  </header>


  <!-- Recipes are loaded-->
  ${until(recipePromise, spinner())}
  

  <footer class="section-title">
    Page 2 of 3
    <a class="pager" href="/catalog/1">&lt; Prev</a>
    <a class="pager" href="/catalog/3">Next &gt;</a>
  </footer>

</section>
`

const recipePreview = (recipe) => html`
<a class="card" href="/details/${recipe.objectId}">
    <article class="preview">
        <div class="title"><h2>${recipe.name}</h2></div>
        <div class="small"><img src=${recipe.img}></div>
    </article>
</a>
`

export function catalogView(ctx) {
    const {page, search} = parseQuery(ctx.querystring)

    ctx.render(template(loadRecipes(page, search), onSearch, page, search))

     function onSearch(e) {
        e.preventDefault()
 
        const formData = new FormData(e.target)
        const searchIn = formData.get('search')

        if (searchIn) {
            ctx.page.redirect(`/catalog?search=${encodeURIComponent(searchIn)}`)
        }else {
            ctx.page.redirect('/catalog')
        }

    }

    
}
async function loadRecipes(page = 1, search = '') {
    const recipes = (await getRecipes(page, search)).results

    if (recipes.length == 0) {
        return html`<p>No recipes found. Be the first to make one! </p>`
    }else { 
         return recipes.map(recipePreview)
    }

}
