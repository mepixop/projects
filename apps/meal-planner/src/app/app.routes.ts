import { Route } from '@angular/router';
import { PlannerComponent } from './components/planner/planner.component';
import { RecipeBookComponent } from './components/recipe-book/recipe-book.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'planner' },
  { path: 'planner', component: PlannerComponent },
  { path: 'recipe-book', component: RecipeBookComponent },
  { path: 'shopping-list', component: ShoppingListComponent }

];
