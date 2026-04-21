export type IngredientCategory = {
  id: number;
  name: string;
  category: 'meat' | 'seafood' | 'dairy' | 'vegetable' | 'fruit' | 'carb' | 'canned' | 'condiment' | 'spice' | 'other';
};

export type GroupedIngredients = {
  [categoryName: string]: IngredientCategory[];
};
