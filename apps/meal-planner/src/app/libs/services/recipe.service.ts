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

  updateRecipe(id: string, newRecipe: Recipe) : void {

      const index = this.recipeList.findIndex(
        (recipe) => {
          return recipe.id === id;
        }
      );
  
      this.recipeList[index] = newRecipe;
      this.recipesChanged.next(this.recipeList.slice());
    
    }
  

  getRecipelist() {
    return this.recipeList;
  }

  getRecipeById(id: string) {
    return this.recipeList.find((ele) => ele.id === id);
  }

  getFirebaseRecipes() {
    if (this.recipeList.length > 0) return;
    this.recipeFirebaseService.getRecipes().subscribe((data) => {
      Object.keys(data).forEach((key) => this.recipeList.push(data[key]));
      this.recipesChanged.next(this.recipeList);
    });
  }
}
