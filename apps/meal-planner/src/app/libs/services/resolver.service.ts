import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { RecipeService } from './recipe.service';
import { inject } from '@angular/core';

export const resolveRecipes: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  recipeService: RecipeService = inject(RecipeService)
) => {
  return recipeService.getFirebaseRecipes();
};
