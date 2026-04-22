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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const idsParam = useMemo(() => ingredientIds.join(','), [ingredientIds]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get<MenuSummary[]>('/menus', {
          params: { ids: idsParam },
        });
        setMenus(res.data);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลเมนูได้');
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [idsParam]);

  return { menus, loading, error };
};
export default useMenus;
