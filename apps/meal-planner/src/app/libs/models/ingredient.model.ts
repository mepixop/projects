export const UNITS = ['g', 'kg', 'ml', 'l', 'pcs'] as const;
export type Unit = typeof UNITS[number]

export class Ingredient {
  constructor(
    public name: string,
    public amount: number,
    public unit: Unit
  ) { }
}