import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../../libs/models/recipe.model';
import { Ingredient, UNITS, Unit } from '../../../libs/models/ingredient.model';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RecipeService } from '../../../libs/services/recipe.service';

@Component({
  selector: 'projects-recipe-upsert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recipe-upsert.component.html',
  styleUrl: './recipe-upsert.component.css',
})
export class RecipeUpsertComponent {
  form: FormGroup;
  recipe: Recipe;
  recipeId: number | null = null;
  ingredientUnits: Unit[] = UNITS.map(e => e);

  constructor(private domSanitizer: DomSanitizer, private recipeService: RecipeService) {
    this.recipe = new Recipe('', '', '', '', [{ name: '', amount: 0, unit: 'g' }]);
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

  resetForm() {
    this.form = this.initForm(this.recipe);
  }

  get ingredients() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  get safeYoutubeUrl() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      (this.form.get('mediaUrl')!.value as string).replace('/watch?v=', '/embed/')
    );
  }

  getImageUrl() {
    return this.form.get('mediaUrl')!.value
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

  saveRecipe() {
    const newRecipe = new Recipe(
      this.form.get('name')!.value,
      this.form.get('description')!.value,
      (this.form.get('mediaUrl')!.value as string).replace('/watch?v=', '/embed/'),
      this.form.get('mediaType')!.value,
      []
    );
    for (const i of this.ingredients) {
      newRecipe.ingredients.push(
        new Ingredient(i.value.name, i.value.amount, i.value.unit)
      );
    }
    this.recipeService.addRecipe(newRecipe)
  }
}
