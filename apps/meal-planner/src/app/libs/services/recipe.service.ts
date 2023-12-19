import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeList: Recipe[] = []
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  addRecipe(recipe: Recipe) {
    this.recipeList.push(recipe)
  }

  getRecipelist() {
    return this.recipeList
  }
}