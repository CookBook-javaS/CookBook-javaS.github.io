import * as api from './api.js'
import { endpoints, createPointer } from './data.js';
import { getUserData } from './util.js';


export async function createComment(comment, recipeId) {
  if (getUserData()) {
    comment.author = createPointer("_User", getUserData().id);
    comment.recipe = createPointer("Recipe", recipeId);
    return api.post(endpoints.comments, comment);
  }
}
export async function getCommentsByRecipe(recipeId) {
  return api.get(endpoints.commentsByRecipe(recipeId))
}
