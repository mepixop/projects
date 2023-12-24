import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Recipe } from '../../../../libs/models';

@Component({
  selector: 'projects-recipe-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  formatDescription(): string {
    let formattedString = this.recipe.description;
    if (formattedString.length > 30) {
      formattedString = formattedString.substring(0, 29) + '...';
    }
    return formattedString;
  }

  get activeCondition(): boolean {
    //put some logic probably based on router id or something here
    return Math.random() > 0.5;
  }
}
