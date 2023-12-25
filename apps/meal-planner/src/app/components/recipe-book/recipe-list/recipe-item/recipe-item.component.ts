import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Recipe } from '../../../../libs/models';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'projects-recipe-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  constructor(private router: Router) {}

  formatDescription(): string {
    let formattedString = this.recipe.description;
    if (formattedString.length > 30) {
      formattedString = formattedString.substring(0, 29) + '...';
    }
    return formattedString;
  }
}
