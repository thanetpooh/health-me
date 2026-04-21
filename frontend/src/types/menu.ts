export type Ingredient = {
  id: number;
  name: string;
  quantity?: string | number;
  unit?: string;
}

export type Step = {
  step: number;
  description: string;
}

export type MenuDetail = {
  id: number;
  name: string;
  description: string;
  imageUrl:string;
  ingredients: Ingredient[];
  instructions: Step[];
}
