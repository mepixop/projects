import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListHeaderComponent } from './shopping-list-header/shopping-list-header.component';
import { ShoppingListListComponent } from './shopping-list-list/shopping-list-list.component';
@Component({
  selector: 'projects-shopping-list',
  standalone: true,
  imports: [
    CommonModule,
    ShoppingListHeaderComponent,
    ShoppingListListComponent,
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {}
