import { Route } from '@angular/router';
import { PlannerComponent } from './components/planner/planner.component';
import { RecipeBookComponent } from './components/recipe-book/recipe-book.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeUpsertComponent } from './components/recipe-book/recipe-upsert/recipe-upsert.component';
import { resolveRecipes } from './libs/services/resolver.service';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'planner' },
  { path: 'planner', component: PlannerComponent },
  {
    path: 'recipe-book',
    component: RecipeBookComponent,
    children: [
      { path: '', pathMatch: 'full', component: RecipeDetailComponent },
      { path: 'add', component: RecipeUpsertComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeUpsertComponent },
    ],
    resolve: { r: resolveRecipes },
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];
