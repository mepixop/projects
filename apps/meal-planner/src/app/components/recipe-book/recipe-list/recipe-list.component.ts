import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../libs/models/recipe.model';
import { RecipeService } from '../../../libs/services/recipe.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
@Component({
  selector: 'projects-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipeList: Recipe[] = []
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeList = this.recipeService.getRecipelist()
    this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipeList = recipes;
    });
  }

}
