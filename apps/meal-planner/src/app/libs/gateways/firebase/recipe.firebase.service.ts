import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeFirebaseService {
  private firebaseUrl: string =
    'https://meal-planner-88860-default-rtdb.europe-west1.firebasedatabase.app/';
  private tableName: string = 'recipe-list';
  private ending: string = '.json';
  recipeList: Recipe[] = [];

  constructor(private httpClient: HttpClient) {}

  getTableUrl(tableName?: string) {
    if (tableName) {
      return this.firebaseUrl + tableName + this.ending;
    }
    return this.firebaseUrl + this.tableName + this.ending;
  }

  addNewRecipe(recipe: Recipe): Recipe {
    this.httpClient
      .post<{ name: string }>(this.getTableUrl(), recipe)
      .subscribe((data) => (recipe.id = data.name));
    return recipe;
  }

  getRecipes() {
    return this.httpClient
      .get<{ [i: string]: Recipe }>(this.getTableUrl())
      .pipe(
        map((data) => {
          Object.keys(data).forEach((key) => {
            data[key].id = key;
          });
          return data;
        })
      );
  }
}
