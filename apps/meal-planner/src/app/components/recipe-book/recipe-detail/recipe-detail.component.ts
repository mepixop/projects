import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../libs/models';
import { RecipeService } from '../../../libs/services/recipe.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'projects-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe | undefined;
  id: string | undefined;
  destroy: Subscription[] = [];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  async delete() {
    if (!this.recipe) {
      alert('No valid recipe to delete');
    } else {
      await this.recipeService.deleteRecipe(this.recipe);
      this.router.navigate(['/recipe-book']);
    }
  }

  ngOnInit(): void {
    this.destroy.push(
      this.route.params.subscribe((params: Params) => {
        this.recipe = this.recipeService.getRecipeById(params['id']);
        if (this.recipe === undefined) {
          this.recipe = new Recipe('', '', '', '', []);
        }
        this.id = params['id'];
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy.forEach((s) => s.unsubscribe());
  }
}
