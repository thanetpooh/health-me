import React, { useEffect, useState } from 'react';
import SelectedIngredients from './SelectedIngredients';
import type { Ingredient } from '../../../types/ingredient';
import CategoryFieldset from './CategoryFieldset';
import MealCard from '../../meal/components/MealCard';
import { thaiMenu } from '../../../utils/menu';

const IngredientCategory = () => {
  const ingredientsInCategory: Ingredient[] = [
    { id: 1, title: 'หมูสับ', category: 'meat' },
    { id: 2, title: 'อกไก่', category: 'meat' },
    { id: 3, title: 'เบคอน', category: 'meat' },
    { id: 4, title: 'ไส้กรอก', category: 'meat' },
    { id: 5, title: 'เนื้อวัว', category: 'meat' },

    { id: 6, title: 'กุ้ง', category: 'seafood' },
    { id: 7, title: 'ปลาทู', category: 'seafood' },
    { id: 9, title: 'หอยแมลงภู่', category: 'seafood' },

    { id: 11, title: 'นมสด', category: 'dairy' },
    { id: 12, title: 'เนย', category: 'dairy' },
    { id: 13, title: 'ชีส', category: 'dairy' },
    { id: 14, title: 'โยเกิร์ต', category: 'dairy' },

    { id: 15, title: 'มะเขือเทศ', category: 'vegetable' },
    { id: 16, title: 'ผักกาดหอม', category: 'vegetable' },
    { id: 17, title: 'คะน้า', category: 'vegetable' },
    { id: 18, title: 'แตงกวา', category: 'vegetable' },
    { id: 19, title: 'แครอท', category: 'vegetable' },
    { id: 20, title: 'หัวหอม', category: 'vegetable' },

    { id: 21, title: 'แอปเปิล', category: 'fruit' },
    { id: 22, title: 'กล้วย', category: 'fruit' },
    { id: 23, title: 'ส้ม', category: 'fruit' },
    { id: 24, title: 'มะม่วง', category: 'fruit' },

    { id: 25, title: 'ข้าวสวย', category: 'carb' },
    { id: 26, title: 'ข้าวกล้อง', category: 'carb' },
    { id: 27, title: 'มาม่า', category: 'carb' },
    { id: 28, title: 'เส้นสปาเกตตี', category: 'carb' },
    { id: 29, title: 'วุ้นเส้น', category: 'carb' },

    { id: 30, title: 'ซอสถั่วเหลือง', category: 'condiment' },
    { id: 31, title: 'ซอสมะเขือเทศ', category: 'condiment' },
    { id: 32, title: 'กะทิ', category: 'condiment' },
    { id: 33, title: 'น้ำปลา', category: 'condiment' },
    { id: 34, title: 'น้ำมันมะกอก', category: 'condiment' },

    { id: 35, title: 'พริกไทย', category: 'spice' },
    { id: 36, title: 'เกลือ', category: 'spice' },
    { id: 37, title: 'ผงปรุงรส', category: 'spice' },
    { id: 38, title: 'พริกป่น', category: 'spice' },
  ];

  const categoryGroups: { key: Ingredient['category']; label: string }[] = [
    { key: 'meat', label: 'เนื้อสัตว์' },
    { key: 'seafood', label: 'ซีฟู๊ด' },
    { key: 'dairy', label: 'ผลิตภัณฑ์นม' },
    { key: 'vegetable', label: 'ผัก' },
    { key: 'fruit', label: 'ผลไม้' },
    { key: 'carb', label: 'คาร์บ' },
    { key: 'condiment', label: 'เครื่องปรุงรส' },
    { key: 'spice', label: 'เครื่องเทศ' },
    { key: 'other', label: 'อื่น ๆ' },
  ];

  const [menu, setMenu] = useState(thaiMenu);

  const [userSelectedIngredients, setUserSelectedIngredients] = useState<number[]>([]);
  {
    const toggle = (id: number) => {
      setUserSelectedIngredients((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    return (
      <>
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
          {userSelectedIngredients.map((id) => {
            const found = ingredientsInCategory.find((item) => item.id === id);
            return found ? <SelectedIngredients key={found.id} ingredient={found} /> : null;
          })}
        </div>

        <section className="md:grid md:grid-cols-2">
          <div>
            {categoryGroups.map(({ key, label }) => {
              const filterIngredients = ingredientsInCategory.filter((i) => i.category === key);
              if (!filterIngredients.length) return null;
              return <CategoryFieldset label={label} ingredients={filterIngredients} toggle={toggle} />;
            })}
          </div>

          <div className="grid grid-cols-2 gap-10 items-start content-start ">
            {menu.map((item, index) => (
              <MealCard key={index} menu={item} />
            ))}
          </div>
        </section>
      </>
    );
  }
};

export default IngredientCategory;
