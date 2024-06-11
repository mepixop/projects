import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule, Params, Router } from '@angular/router';
import { Recipe } from '../../../libs/models/recipe.model';
import { Ingredient, UNITS, Unit } from '../../../libs/models/ingredient.model';
import { DomSanitizer } from '@angular/platform-browser';
import { RecipeService } from '../../../libs/services/recipe.service';
import { Subscription } from 'rxjs';
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
  id: string | undefined;
  ingredientUnits: Unit[] = UNITS.map((e) => e);
  editMode = false;

  subscriptions: Subscription[] = [];

  constructor(
    private domSanitizer: DomSanitizer,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipe = new Recipe('', '', '', '', [
      { name: '', amount: 0, unit: 'g' },
    ]);
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.recipe = this.recipeService.getRecipeById(this.id!)!;
        }
      })
    );
    const form = new FormGroup({
      name: new FormControl(this.recipe.name, [Validators.required]),
      description: new FormControl(this.recipe.description),
      mediaUrl: new FormControl(this.recipe.mediaUrl),
      mediaType: new FormControl(this.recipe.mediaType),
      ingredients: new FormArray([]),
    });
    for (const i of this.recipe.ingredients) {
      (<FormArray>form.get('ingredients')).controls.push(
        this.createIngredientGroup(i)
      );
    }
    return form;
  }

  routingBack() {
    if (confirm('Changes will not be saved, are you sure to continue back?')) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  resetForm() {
    this.form = this.initForm();
  }

  get ingredients() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  get safeYoutubeUrl() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      (this.form.get('mediaUrl')!.value as string).replace(
        '/watch?v=',
        '/embed/'
      )
    );
  }

  getImageUrl() {
    return this.form.get('mediaUrl')!.value;
  }

  deleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  addNewIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      this.createIngredientGroup({ name: '', amount: 0, unit: 'g' })
    );
  }

  createIngredientGroup(ingredient: Ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient.name, [Validators.required]),
      amount: new FormControl(ingredient.amount, [Validators.required]),
      unit: new FormControl(ingredient.unit),
    });
  }

  saveRecipe() {
    let newRecipe = new Recipe(
      this.form.get('name')!.value,
      this.form.get('description')!.value,
      (this.form.get('mediaUrl')!.value as string).replace(
        '/watch?v=',
        '/embed/'
      ),
      this.form.get('mediaType')!.value,
      []
    );
    for (const i of this.ingredients) {
      newRecipe.ingredients.push(
        new Ingredient(i.value.name, i.value.amount, i.value.unit)
      );
    }

    if (!this.editMode) {
      newRecipe = this.recipeService.addRecipe(newRecipe);
      this.id = newRecipe.id;
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.recipeService.updateRecipe(this.id!, newRecipe);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
