import * as api from "./api.js";

export const endpoints = {
  recipes: "/classes/Recipe",
  comments: "/classes/Comments",
  recipeById: "/classes/Recipe/",
  recipeDetails: (id) => `/classes/Recipe/${id}?include=owner`,
  commentsByRecipe: (recipeId) => `/classes/Comments?where=${ createPointerQuery('recipe', 'Recipe', recipeId) }&include=owner`
};
function createPointerQuery(propName, className, objectId) {
    return createQuery({[propName]: createPointer(className, objectId)})
}
function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query))
}
export function createPointer(className, objectId) {
  return {
    __type: "Pointer",
    className,
    objectId,
  };
}

export const login = api.login;
export const register = api.register;
export const logout = api.logout;