export interface Ingredient {
  id: number;
  name: string;
  quantity?: string | number;
  unit?: string;
}

export interface Step {
  step: number;
  description: string;
}

export interface MenuDetail {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Step[];
}
