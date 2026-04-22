import type { MenuSummary } from '../../../hooks/useMenus';
import MealCard from '../../meal/components/MealCard';

type Props = {
  data: MenuSummary[];
  isUpdating: boolean;
  error: string | null;
};

const MenuList = ({ data, isUpdating, error }: Props) => {
  return (
    <main className="lg:col-span-8 xl:col-span-9 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black italic tracking-tighter text-base-content">ถึงเวลาทำอาหารแล้ว !!</h1>
            {isUpdating && <span className="loading loading-ring loading-md text-primary"></span>}
          </div>
          <p className="text-sm opacity-60 font-medium">เมนูที่คุณสามารถรังสรรค์ได้จากวัตถุดิบในตู้เย็น</p>
        </div>
        <div className="badge badge-outline badge-lg opacity-50 px-4 py-3 font-bold">{data?.length || 0} เมนู</div>
      </div>

      {error && (
        <div className="alert alert-error shadow-lg rounded-2xl mb-6">
          <span className="font-bold text-white">เกิดข้อผิดพลาด: {error}</span>
        </div>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-300 ${
          isUpdating ? 'opacity-50 grayscale-[20%]' : 'opacity-100'
        }`}
      >
        {data?.map((item) => (
          <div key={item.id} className="hover:translate-y-[-4px] transition-transform duration-300">
            <MealCard menu={item} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default MenuList;
