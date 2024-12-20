import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Ingredient } from '../../libs/models';
import { Observable } from 'rxjs';
import { ShoppingListService } from '../../libs/services/shoppinglist.service';
import { ShoppingListHeaderComponent } from './shopping-list-header/shopping-list-header.component';
@Component({
  selector: 'projects-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingListHeaderComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients$!: Observable<Ingredient[]>;

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients$ = this.shoppinglistService.ingredients$;
  }
}
