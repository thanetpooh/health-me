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
  const { menus, loading: menusLoading, error: menusError } = useMenus(selectedIds);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const groupedIngredients = useMemo(() => {
    return ingredients.reduce<GroupedIngredients>((acc, curr) => {
      const groupName = curr.category || 'อื่นๆ';
      if (acc[groupName] === undefined) {
        acc[groupName] = [];
      }
      acc[groupName].push(curr);
      return acc;
    }, {});
  }, [ingredients]);

  if (menusLoading || catLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-20 gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="card bg-base-100 shadow-xl sticky top-6">
            <div className="card-body p-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter text-base-content">
                    เลือกวัตถุดิบที่คุณมี
                  </h2>
                </div>
                <div className="badge badge-primary font-bold">{selectedIds.length}</div>
              </div>

              <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
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
                          selectedIds={selectedIds}
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
                    className="btn btn-ghost btn-sm w-full text-error font-bold"
                    onClick={() => setSelectedIds([])}
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        <MenuList data={menus} isLoading={menusLoading} error={menusError} />
      </div>
    </div>
  );
};

export default RecipeFinder;
