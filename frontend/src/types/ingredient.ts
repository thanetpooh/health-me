export type IngredientCategory = {
  id: number;
  name: string;
  category: string;
};

export type GroupedIngredients = {
  [categoryName: string]: IngredientCategory[];
};
