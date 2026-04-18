import { useEffect, useState, useMemo } from 'react';
import MealCard from '../../meal/components/MealCard';
import useMenus from '../../../hooks/useMenus';
import api from '../../../lib/axiosInstance';
import axios from 'axios';

type Ingredient = {
  id: number;
  name: string;
  category: string;
};

type GroupedIngredients = {
  [categoryName: string]: Ingredient[];
};

const IngredientCategory = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [catLoading, setCatLoading] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { menus, loading: menusLoading, error: menusError } = useMenus(selectedIds);



   useEffect(() => {
    const fetchData = async () => {
      setCatLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/api/ingredients")
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

  const handleSelect = async (id: number): Promise<void> => {
    const nextIds = selectedIds.includes(id) ? selectedIds.filter((i) => i !== id) : [...selectedIds, id];
    setSelectedIds(nextIds);
  };

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
                        <label
                          key={item.id}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-all duration-200 ${
                            selectedIds.includes(item.id)
                              ? 'border-primary bg-primary/5 shadow-sm'
                              : 'border-base-200 hover:border-base-300 hover:bg-base-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="checkbox checkbox-xs checkbox-primary rounded-sm border-2"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => handleSelect(item.id)}
                          />
                          <span
                            className={`text-[12px] truncate font-medium ${
                              selectedIds.includes(item.id) ? 'text-primary font-bold' : 'text-base-content/70'
                            }`}
                          >
                            {item.name}
                          </span>
                        </label>
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

        <main className="lg:col-span-8 xl:col-span-9">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter text-base-content">ถึงเวลาทำอาหารแล้ว !!</h1>
              <p className="text-sm opacity-60 font-medium">เมนูที่คุณสามารถรังสรรค์ได้จากวัตถุดิบในตู้เย็น</p>
            </div>
            <div className="badge badge-outline badge-lg opacity-50 px-4 py-3 font-bold">{menus?.length || 0} เมนู</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {menus?.map((item: any, index: number) => (
              <div key={index} className="hover:translate-y-[-4px] transition-transform duration-300">
                <MealCard menu={item} />
              </div>
            ))}
          </div>

          {(!menus || menus.length === 0) && !menusError && (
            <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
              <p className="text-lg font-black opacity-20 uppercase tracking-[0.2em]">No matching menus</p>
              <p className="text-xs opacity-20 font-bold mt-2">TRY SELECTING MORE INGREDIENTS</p>
            </div>
          )}

          {menusError && (
            <div className="alert alert-error shadow-lg rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-bold">เกิดข้อผิดพลาดในการโหลดเมนู กรุณาลองใหม่อีกครั้ง</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default IngredientCategory;
