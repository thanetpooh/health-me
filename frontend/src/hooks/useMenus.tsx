import { useEffect, useMemo, useState } from 'react';
import api from '../lib/axiosInstance';

export type Ingredient = {
  name: string;
  quantity: string | number;
  unit: string;
};

export type Step = {
  step: number;
  instruction: string;
};

export type Menu = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  baseIngredients: Ingredient[];
  steps: Step[];
};

export type MenuSummary = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  availableIngredients: number;
  totalIngredients: number;
  missingIngredients: number;
};

export type MenuDetail = MenuSummary & {
  baseIngredients: Ingredient[];
  steps: Step[];
};

const useMenus = (ingredientIds: number[]) => {
  const [menus, setMenus] = useState<MenuSummary[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idsParam = useMemo(() => ingredientIds.join(','), [ingredientIds]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setIsUpdating(true);
        const res = await api.get('/menus', { params: { ids: idsParam } });

        if (!isCancelled) {
          setMenus(res.data);
        }
      } catch (err) {
        if (!isCancelled) setError('...');
      } finally {
        if (!isCancelled) setIsUpdating(false);
      }
    };

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [idsParam]);

  return { menus, isUpdating, error };
};

export default useMenus;
