import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../../libs/models/recipe.model';
import { Ingredient, UNITS, Unit } from '../../../libs/models/ingredient.model';

@Component({
  selector: 'projects-recipe-upsert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-upsert.component.html',
  styleUrl: './recipe-upsert.component.css',
})
export class RecipeUpsertComponent {
  form: FormGroup;
  recipe: Recipe;
  recipeId: number | null = null;
  ingredientUnits: Unit[] = UNITS.map(e => e);

  constructor() {
    this.recipe = new Recipe('', '', '', '', []);
    this.form = this.initForm(this.recipe);
  }

  initForm(recipe: Recipe): FormGroup {
    const form = new FormGroup({
      name: new FormControl(recipe.name, [Validators.required]),
      description: new FormControl(recipe.description),
      mediaUrl: new FormControl(recipe.mediaUrl),
      mediaType: new FormControl(recipe.mediaType),
      ingredients: new FormArray([])
    });
    for (const i of recipe.ingredients) {
      (<FormArray>form.get('ingredients')).controls.push(
        this.createIngredientGroup(i)
      )
    }
    return form;
  }

  get ingredients() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  deleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  addNewIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      this.createIngredientGroup({ name: '', amount: 0, unit: 'g' })
    )
  }

  createIngredientGroup(ingredient: Ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient.name, [Validators.required]),
      amount: new FormControl(ingredient.amount, [Validators.required]),
      unit: new FormControl(ingredient.unit)
    });
  }
}
