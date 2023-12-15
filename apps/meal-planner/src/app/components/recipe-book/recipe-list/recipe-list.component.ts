import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'projects-recipe-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {}
