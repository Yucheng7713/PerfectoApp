// Since the recipe fetching functionality has yet integrated with Sails backend,
// The recipe data is stored locally for demonstrating core functionalities.
let baseRecipesData = require('../mockupBaseData');
// Base recipes JSON data
export const baseGenres = baseRecipesData['baseFlavors'];
export const baseRecipes = baseRecipesData['bases'];
// Available customization options -> Milk, Temperature, Flavor (Syrup), Sweetner, Extra ( other ingredients )
export const milkOptions = baseRecipesData['milkOptions'];
export const tempOptions = baseRecipesData['tempOptions'];
export const flavorOptions = baseRecipesData['flavorOptions'];
export const sweetnerOptions = baseRecipesData['sweetnerOptions'];
export const extraOptions = baseRecipesData['extraOptions'];
