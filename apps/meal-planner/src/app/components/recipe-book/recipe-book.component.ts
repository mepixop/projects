import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeHeaderComponent } from './recipe-header/recipe-header.component';

@Component({
  selector: 'projects-recipe-book',
  standalone: true,
  imports: [CommonModule, RouterModule, RecipeListComponent, RecipeHeaderComponent],
  templateUrl: './recipe-book.component.html',
  styleUrl: './recipe-book.component.css',
})
export class RecipeBookComponent { }
