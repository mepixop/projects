import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Ingredient } from '../../../../libs/models';
import { ShoppingListService } from '../../../../libs/services/shoppinglist.service';
@Component({
  selector: 'projects-shopping-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list-item.component.html',
  styleUrl: './shopping-list-item.component.css',
})
export class ShoppingListItemComponent implements OnInit {
  ingredients$!: Observable<Ingredient[]>;

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients$ = this.shoppinglistService.ingredients$;
  }
}
