import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeList: Recipe[] = []

  addRecipe(recipe: Recipe) {
    this.recipeList.push(recipe)
  }

  getRecipelist() {
    return this.recipeList
  }
}