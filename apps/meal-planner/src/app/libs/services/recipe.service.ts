import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';
import { RecipeFirebaseService } from '../gateways/firebase/recipe.firebase.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeList: Recipe[] = [];
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private recipeFirebaseService: RecipeFirebaseService) {}

  addRecipe(recipe: Recipe) {
    const finalRecipe = this.recipeFirebaseService.addNewRecipe(recipe);
    this.recipeList.push(finalRecipe);
  }

  getRecipelist() {
    return this.recipeList;
  }

  getFirebaseRecipes() {
    if (this.recipeList.length > 0) return;
    this.recipeFirebaseService.getRecipes().subscribe((data) => {
      Object.keys(data).forEach((key) => this.recipeList.push(data[key]));
    });
  }
}
