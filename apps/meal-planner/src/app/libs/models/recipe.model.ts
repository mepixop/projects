import { Ingredient } from './ingredient.model';

export class Recipe {
  public id: string = '';
  constructor(
    public name: string,
    public description: string,
    public mediaUrl: string,
    public mediaType: 'image' | 'youtube' | '',
    public ingredients: Ingredient[]
  ) {}
}
