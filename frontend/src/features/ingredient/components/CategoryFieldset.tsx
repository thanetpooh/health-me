import type { Ingredient } from '../../../types/ingredient';

type Props = {
  label: string;
  ingredients: Ingredient[];
  toggle: (id: number) => void;
};

const CategoryFieldset = ({ label, ingredients, toggle }: Props) => {
  return (
    <>
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full max-w-xs border p-4 mb-4">
        <legend className="fieldset-legend">{label}</legend>
        {ingredients.map((item) => (
          <label key={item.id} className="label">
            <input type="checkbox" className="checkbox" onChange={() => toggle(item.id)} />
            {item.title}
          </label>
        ))}
      </fieldset>
    </>
  );
};

export default CategoryFieldset;
