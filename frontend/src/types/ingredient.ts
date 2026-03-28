export type Ingredient = {
  id: number;
  title: string;
  category: 'meat' | 'seafood' | 'dairy' | 'vegetable' | 'fruit' | 'carb' | 'canned' | 'condiment' | 'spice' | 'other';
  defaultChecked?: boolean;
};
