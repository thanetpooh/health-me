import React, { memo } from 'react';
import type { IngredientCategory } from '../../../types/ingredient';

type Props = {
  ingredient: IngredientCategory;
  isSelected: boolean;
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const IngredientItem = memo(({ ingredient, isSelected, setSelectedIds }: Props) => {
  const handleSelect = (): void => {
    setSelectedIds((prev) => {
      return isSelected ? prev.filter((id) => id !== ingredient.id) : [...prev, ingredient.id];
    });
  };

  return (
    <label
      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-all duration-200 select-none ${
        isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-base-200 hover:border-base-300 hover:bg-base-100'
      }`}
    >
      <input
        type="checkbox"
        className="checkbox checkbox-xs checkbox-primary rounded-sm border-2"
        checked={isSelected}
        onChange={handleSelect}
      />
      <span
        className={`text-[12px] truncate font-medium transition-colors ${
          isSelected ? 'text-primary font-bold' : 'text-base-content/70'
        }`}
      >
        {ingredient.name}
      </span>
    </label>
  );
});

IngredientItem.displayName = 'IngredientItem';

export default IngredientItem;
