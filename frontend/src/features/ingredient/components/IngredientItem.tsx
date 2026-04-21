import React, { useMemo, useState } from 'react';

import type { IngredientCategory } from '../../../types/ingredient';

type Props = {
  ingredient: IngredientCategory;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const IngredientItem = ({ ingredient, selectedIds, setSelectedIds }: Props) => {
  const isSelected = useMemo(() => selectedIds.includes(ingredient.id), [selectedIds, ingredient.id]);
  const handleSelect = (): void => {
    setSelectedIds((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(ingredient.id)) {
        nextSet.delete(ingredient.id);
      } else {
        nextSet.add(ingredient.id);
      }
      return Array.from(nextSet);
    });
  };
  return (
    <>
      <label
        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-all duration-200 ${
          isSelected
            ? 'border-primary bg-primary/5 shadow-sm'
            : 'border-base-200 hover:border-base-300 hover:bg-base-50'
        }`}
      >
        <input
          type="checkbox"
          className="checkbox checkbox-xs checkbox-primary rounded-sm border-2"
          checked={isSelected}
          onChange={handleSelect}
        />
        <span
          className={`text-[12px] truncate font-medium ${
            isSelected ? 'text-primary font-bold' : 'text-base-content/70'
          }`}
        >
          {ingredient.name}
        </span>
      </label>
    </>
  );
};

export default IngredientItem;
