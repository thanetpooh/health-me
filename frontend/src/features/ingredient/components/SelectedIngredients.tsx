import type { Ingredient } from '../../../types/ingredient';

type SelectedIngredientsProps = {
  ingredient: Ingredient;
};

const SelectedIngredients = ({ ingredient }: SelectedIngredientsProps) => {
  if (!ingredient) return null;
  return (
    <>
      <button className="btn btn-outline">
        {ingredient.title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </>
  );
};

export default SelectedIngredients;
