import { useEffect, useState } from 'react';
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
  baseIngredients: Ingredient[];
  steps: Step[];
};

export type MenuWithImage = Menu & {
  imageUrl: string | null;
};

const useMenus = (ingredientIds: number[]) => {
  const [menus, setMenus] = useState<MenuWithImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const idsParam = ingredientIds.join(',');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get<Menu[]>('/menus', {
          params: { ids: idsParam },
        });

        const menusWithImages: MenuWithImage[] = res.data.map((menu) => ({
          ...menu,
          imageUrl: `${import.meta.env.VITE_API_BASE_URL}/menus/image/${menu.id}`,
        }));

        setMenus(menusWithImages);
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
