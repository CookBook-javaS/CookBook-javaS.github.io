import { updateRecipe, getRecipeById } from "../api/recipes.js";
import { html } from "../lib.js";
import { notify } from "../middlewares/notify.js";
import { errorMsg, field } from "./common.js";

const template = (onSubmit, err, data) => html`
<section id="edit">
   <article>
     <h2>Edit Recipe</h2>
     <form @submit=${onSubmit} id="editForm">
     ${errorMsg(err)}
        ${field("Name", "name", "text", data.name, "Recipe name", err.name)}
        ${field("Image", "img", "text", data.img, "Image URL", err.img)}
        ${field("Ingredients", "ingredients", "textarea", data.ingredients, "Enter ingredients on separate lines", err.ingredients)}
        ${field("Preparation", "steps", "textarea", data.steps, "Enter preparation steps on separate lines", err.steps)}
       <input type="submit" value="Save Changes">
     </form>
   </article>
</section>`; 

export async function editView(ctx) {
  const currecipe = await getRecipeById(ctx.params.id)

  update();

  function update(errors = {}, data = currecipe) {
    ctx.render(template(onEdit, errors, data));
  }

  async function onEdit(e) {
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
    await updateRecipe(currecipe.objectId, recipe);
    notify("Recipe updated")
    ctx.page.redirect("/details/" + currecipe.objectId);
   } catch (err) {
       update(err, recipe)
   }
  }
}
