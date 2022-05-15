import { createRecipe } from "../api/recipes.js";
import { html } from "../lib.js";
import { errorMsg, field } from "./common.js";

const template = (onSubmit, err, data) => html`
<section id="create">
   <article>
     <h2>New Recipe</h2>
     <form @submit=${onSubmit} id="createForm">
     ${errorMsg(err)}
        ${field("Name", "name", "text", data.name, "Recipe name", err.name)}
        ${field("Image", "img", "text", data.img, "Image URL", err.img)}
        ${field("Ingredients", "ingredients", "textarea", data.ingredients, "Enter ingredients on separate lines", err.ingredients)}
        ${field("Preparation", "steps", "textarea", data.steps, "Enter preparation steps on separate lines", err.steps)}
       <input type="submit" value="Create Recipe">
     </form>
   </article>
</section>`; 

export function createView(ctx) {
  update();

  function update(errors = {}, data = {}) {
    ctx.render(template(onCreate, errors, data));
  }

  async function onCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const recipe = {
        name: formData.get("name").trim(),
        img: formData.get("img").trim(),
        ingredients: formData.get("ingredients").trim().split('\n').filter(r => r != ''),
        steps: formData.get("steps").trim().split('\n').filter(r => r != '')
    }

   try {
    if (Object.keys(recipe).some((k) => recipe[k] == '')) {
      throw {
          message: "All fields are mandatory!",
          name: recipe.name == '' ? true : false,
          img: recipe.img == '' ? true : false,
          ingredients: recipe.ingredients == '' ? true : false,
          steps: recipe.steps == '' ? true : false
      };
    }
    
    e.target.reset();
    const createdRecipe = await createRecipe(recipe);
    ctx.page.redirect("/details/" + createdRecipe.objectId);
   } catch (err) {
       update(err, recipe)
   }
  }
}
