import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../lib/axiosInstance';
import { type MenuDetail as MenuDetailType } from '../../../types/menu';

const MenuDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [menuItem, setMenuItem] = useState<MenuDetailType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuById = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<MenuDetailType>(`/menus/${id}`);
        setMenuItem(response.data);
      } catch (err) {
        console.error(err);
        setError('ไม่สามารถโหลดข้อมูลเมนูได้');
      } finally {
        setLoading(false);
      }
    };

    void fetchMenuById();
  }, [id]);

  if (loading) return <div className="text-center p-20">กำลังปรุงข้อมูล...</div>;
  if (error || !menuItem) return <div className="text-center p-20 text-red-500 font-bold">{error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex flex-col items-center">
        <img
          className="w-full md:w-3/4 h-[400px] object-cover rounded-2xl shadow-lg"
          src={menuItem.imageUrl}
          alt={menuItem.name}
        />
      </div>

      <div className="mt-8 mb-4 border-b pb-4">
        <h1 className="text-5xl font-extrabold text-gray-800">{menuItem.name}</h1>
        <p className="text-lg text-gray-600 mt-4 leading-relaxed">{menuItem.description}</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div className="bg-orange-50 p-6 rounded-xl">
          <h2 className="mb-6 text-3xl font-bold text-orange-700 border-l-4 border-orange-500 pl-4">วัตถุดิบ</h2>
          <div className="space-y-3">
            {menuItem.ingredients?.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-orange-200 pb-2">
                <span className="text-gray-700 font-medium">{item.name}</span>
                {item.quantity && (
                  <span className="font-semibold text-gray-900">
                    {item.quantity} {item.unit}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4">วิธีการทำ</h2>
          <div className="space-y-6">
            {menuItem.instructions?.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-none w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <p className="text-gray-700 pt-1 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuDetail;
