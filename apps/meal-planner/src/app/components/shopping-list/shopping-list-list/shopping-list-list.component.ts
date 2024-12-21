import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
@Component({
  selector: 'projects-shopping-list-list',
  standalone: true,
  imports: [CommonModule, ShoppingListItemComponent],
  templateUrl: './shopping-list-list.component.html',
  styleUrl: './shopping-list-list.component.css',
})
export class ShoppingListListComponent {}
