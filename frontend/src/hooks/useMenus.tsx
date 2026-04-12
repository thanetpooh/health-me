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
    const urls: string[] = [];
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get<Menu[]>('/menus', {
          params: {
            ids: idsParam,
          },
        });

        const menusWithImages: MenuWithImage[] = await Promise.all(
          res.data.map(async (menu) => {
            try {
              const imgRes = await api.get<Blob>(`/menus/image/${menu.id}`, {
                responseType: 'blob',
              });
              const imageUrl = URL.createObjectURL(imgRes.data);
              urls.push(imageUrl);
              return { ...menu, imageUrl };
            } catch {
              return { ...menu, imageUrl: null };
            }
          }),
        );

        setMenus(menusWithImages);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลเมนูได้');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [idsParam]);

  return { menus, loading, error };
};

export default useMenus;
