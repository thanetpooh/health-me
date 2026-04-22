import { useEffect, useState, useMemo } from 'react';
import useMenus from '../../../hooks/useMenus';
import IngredientItem from './IngredientItem';
import type { IngredientCategory, GroupedIngredients } from '../../../types/ingredient';
import MenuList from './MenuList';
import api from '../../../lib/axiosInstance';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState<IngredientCategory[]>([]);
  const [catLoading, setCatLoading] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [debouncedIds, setDebouncedIds] = useState<number[]>(selectedIds);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedIds(selectedIds);
    }, 400);
    return () => clearTimeout(handler);
  }, [selectedIds]);

  const { menus, isUpdating, error: menusError } = useMenus(debouncedIds);

  useEffect(() => {
    const fetchIngredients = async () => {
      setCatLoading(true);
      try {
        const res = await api.get('/ingredients');
        setIngredients(res.data);
      } catch (err) {
        console.error('Failed to fetch ingredients:', err);
      } finally {
        setCatLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  const groupedIngredients = useMemo(() => {
    return ingredients.reduce<GroupedIngredients>((acc, curr) => {
      const groupName = curr.category || 'อื่นๆ';
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(curr);
      return acc;
    }, {});
  }, [ingredients]);

  if (catLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-base-200">
        <span className="loading loading-ring loading-md text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="card bg-base-100 shadow-xl sticky top-6 border border-base-300">
            <div className="card-body p-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter text-base-content">วัตถุดิบของคุณ</h2>
                  <p className="text-[10px] opacity-50 font-bold uppercase tracking-widest">Select your items</p>
                </div>
                <div className="badge badge-primary font-bold shadow-sm">{selectedIds.length}</div>
              </div>

              <div className="space-y-8 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(groupedIngredients).map(([categoryName, items]) => (
                  <div key={categoryName}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-4 bg-primary rounded-full"></span>
                      <h3 className="text-xs font-black uppercase opacity-70 tracking-widest">{categoryName}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {items.map((item) => (
                        <IngredientItem
                          key={item.id}
                          ingredient={item}
                          isSelected={selectedIds.includes(item.id)}
                          setSelectedIds={setSelectedIds}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedIds.length > 0 && (
                <div className="mt-6 pt-4 border-t border-base-200">
                  <button
                    className="btn btn-ghost btn-sm w-full text-error font-bold hover:bg-error/10"
                    onClick={() => setSelectedIds([])}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>
        <MenuList data={menus} isUpdating={isUpdating} error={menusError} />
      </div>
    </div>
  );
};

export default RecipeFinder;
