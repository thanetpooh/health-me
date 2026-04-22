import type { MenuSummary } from '../../../hooks/useMenus';
import MealCard from '../../meal/components/MealCard';

type Props = {
  data: MenuSummary[];
  isLoading: boolean;
  error: string | null;
};

const MenuList = ({ data, isLoading, error }: Props) => {
  if (isLoading) {
    return (
      <div className="lg:col-span-8 xl:col-span-9 flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <main className="lg:col-span-8 xl:col-span-9">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-base-content">ถึงเวลาทำอาหารแล้ว !!</h1>
          <p className="text-sm opacity-60 font-medium">เมนูที่คุณสามารถรังสรรค์ได้จากวัตถุดิบในตู้เย็น</p>
        </div>
        <div className="badge badge-outline badge-lg opacity-50 px-4 py-3 font-bold">{data?.length || 0} เมนู</div>
      </div>

      {error && (
        <div className="alert alert-error shadow-lg rounded-2xl mb-6">
          <span className="font-bold">เกิดข้อผิดพลาด: {error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.map((item) => (
          <div key={item.id} className="hover:translate-y-[-4px] transition-transform duration-300">
            <MealCard menu={item} />
          </div>
        ))}
      </div>

      {(!data || data.length === 0) && !error && (
        <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
          <p className="text-lg font-black opacity-20 uppercase">โปรดเลือกวัตถุดิบอื่น</p>
        </div>
      )}
    </main>
  );
};

export default MenuList;
