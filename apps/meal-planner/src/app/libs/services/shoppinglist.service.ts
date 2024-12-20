// services/shopping-list.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([]);
  ingredients$ = this.ingredientsSubject.asObservable();

  addIngredients(newIngredients: Ingredient[]): void {
    const currentIngredients = this.ingredientsSubject.value;
    const ingredientMap = new Map<string, Ingredient>();

    currentIngredients.forEach((ingredient) => {
      const key = `${ingredient.name.toLowerCase()}-${ingredient.unit}`;
      ingredientMap.set(key, ingredient);
    });

    newIngredients.forEach((ingredient) => {
      const key = `${ingredient.name.toLowerCase()}-${ingredient.unit}`;
      const existingIngredient = ingredientMap.get(key);
      if (existingIngredient) {
        existingIngredient.amount += ingredient.amount;
      } else {
        ingredientMap.set(key, { ...ingredient });
      }
    });

    const updatedIngredients = Array.from(ingredientMap.values());

    this.ingredientsSubject.next(updatedIngredients);
  }
}
