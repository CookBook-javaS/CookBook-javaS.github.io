import * as api from "./api.js";
import { createPointer, endpoints } from "./data.js";
import { getUserData } from "./util.js";

export async function createRecipe(recipe) {
  if (getUserData()) {
    recipe.owner = createPointer("_User", getUserData().id);
    return api.post(endpoints.recipes, recipe);
  }
}
export async function getRecipeById(id) {
  return api.get(endpoints.recipeDetails(id));
}
export async function updateRecipe(id, recipe) {
  return api.put(endpoints.recipeById + id, recipe);
}
export async function deleteRecipe(id) {
  return api.del(endpoints.recipeById + id);
}
export async function getRecipes() {
    return api.get(endpoints.recipes);
    //никъде не казваме await за да не развалим "опаковката"- промиса, ще кажем await като викнем getRecipes(),
    //за да може като има грешка да излезне не някъде посредата на пътя(ако има някъде await)
    //ами на нивото на което ние работим(а не някъде в някой от файловете api.js или data.js ами в някой
    //от viewтата)!
  
    //казваме обаче че е async функция, за да знаем че тя пренася промис и тя попринцип ще върне промис
    // и така ще продължи веригата от връщане на пормиси започната от api.js през data.js до някое от viewtata.
}
