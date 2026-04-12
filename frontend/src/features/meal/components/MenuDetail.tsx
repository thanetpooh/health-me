import React from 'react';
import { useParams } from 'react-router-dom';
import useMenus from '../../../hooks/useMenus';

const MenuDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`id is`, id);
  const { menus, loading, error } = useMenus();

  const menuItem = menus.find((item) => item.id === Number(id));

  if (loading) {
    return <div className="flex justify-center p-20">กำลังปรุงข้อมูล...</div>;
  }

  if (error || !menuItem) {
    return <div className="text-center p-20 text-red-500 font-bold">ไม่พบเมนูที่ต้องการ</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex flex-col items-center">
        <img
          className="w-full md:w-3/4 h-[400px] object-cover rounded-2xl shadow-lg"
          src={menuItem.imageUrl || 'https://via.placeholder.com/800x400?text=No+Image'}
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
            {menuItem.baseIngredients?.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-orange-200 pb-2">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-semibold text-gray-900">
                  {item.quantity} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4">วิธีการทำ</h2>
          <div className="space-y-6">
            {menuItem.steps?.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-none w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <p className="text-gray-700 pt-1 leading-relaxed">{item.instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuDetail;
