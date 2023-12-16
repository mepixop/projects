import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'projects-recipe-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-header.component.html',
  styleUrl: './recipe-header.component.css',
})
export class RecipeHeaderComponent { }
