import React, { useState } from 'react';

const IngredientCategory = () => {
  type Ingredient = {
    id: number;
    name: string;
    category:
      | 'meat'
      | 'seafood'
      | 'dairy'
      | 'vegetable'
      | 'fruit'
      | 'carb'
      | 'canned'
      | 'condiment'
      | 'spice'
      | 'other';
    defaultChecked?: boolean;
  };

  const ingredientsInCategory: Ingredient[] = [
    { id: 1, name: 'หมูสับ', category: 'meat' },
    { id: 2, name: 'อกไก่', category: 'meat' },
    { id: 3, name: 'เบคอน', category: 'meat' },
    { id: 4, name: 'ไส้กรอก', category: 'meat' },
    { id: 5, name: 'เนื้อวัว', category: 'meat' },

    { id: 6, name: 'กุ้ง', category: 'seafood' },
    { id: 7, name: 'ปลาทู', category: 'seafood' },
    { id: 9, name: 'หอยแมลงภู่', category: 'seafood' },

    { id: 11, name: 'นมสด', category: 'dairy' },
    { id: 12, name: 'เนย', category: 'dairy' },
    { id: 13, name: 'ชีส', category: 'dairy' },
    { id: 14, name: 'โยเกิร์ต', category: 'dairy' },

    { id: 15, name: 'มะเขือเทศ', category: 'vegetable' },
    { id: 16, name: 'ผักกาดหอม', category: 'vegetable' },
    { id: 17, name: 'คะน้า', category: 'vegetable' },
    { id: 18, name: 'แตงกวา', category: 'vegetable' },
    { id: 19, name: 'แครอท', category: 'vegetable' },
    { id: 20, name: 'หัวหอม', category: 'vegetable' },

    { id: 21, name: 'แอปเปิล', category: 'fruit' },
    { id: 22, name: 'กล้วย', category: 'fruit' },
    { id: 23, name: 'ส้ม', category: 'fruit' },
    { id: 24, name: 'มะม่วง', category: 'fruit' },

    { id: 25, name: 'ข้าวสวย', category: 'carb' },
    { id: 26, name: 'ข้าวกล้อง', category: 'carb' },
    { id: 27, name: 'มาม่า', category: 'carb' },
    { id: 28, name: 'เส้นสปาเกตตี', category: 'carb' },
    { id: 29, name: 'วุ้นเส้น', category: 'carb' },

    { id: 30, name: 'ซอสถั่วเหลือง', category: 'condiment' },
    { id: 31, name: 'ซอสมะเขือเทศ', category: 'condiment' },
    { id: 32, name: 'กะทิ', category: 'condiment' },
    { id: 33, name: 'น้ำปลา', category: 'condiment' },
    { id: 34, name: 'น้ำมันมะกอก', category: 'condiment' },

    { id: 35, name: 'พริกไทย', category: 'spice' },
    { id: 36, name: 'เกลือ', category: 'spice' },
    { id: 37, name: 'ผงปรุงรส', category: 'spice' },
    { id: 38, name: 'พริกป่น', category: 'spice' },
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

  const [userSelectedIngredients, setUserSelectedIngredients] = useState<number[]>([]);
  {
    const toggle = (id: number) => {
      setUserSelectedIngredients((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
      console.log(userSelectedIngredients);
    };

    // โจทย์ : dispaly ของที่เลือก
    // ส่ง array ของ id ทั้งหมด ให้ ingredientsInCategory  เช่น [1,3,5,2,10]
    // ingredientsInCategory ใช้ filter ว่า include ไหม ถ้า include ก็ให้return ingredientsInCategory.title มา

    return (
      <>
        <p className="text-red-500">{userSelectedIngredients}</p>

        <section>
          <p>
            {userSelectedIngredients.map((id) => {
              const found = ingredientsInCategory.find((element) => element.id === id);
              return found ? <li key={id}>{found.name}</li> : null;
            })}
          </p>
          {categoryGroups.map(({ key, label }) => {
            const filterIngredients = ingredientsInCategory.filter((i) => i.category === key);
            if (!filterIngredients.length) return null;

            return (
              <fieldset
                key={key}
                className="grid grid-cols-2 gap-2 fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4"
              >
                <legend className="fieldset-legend">{label}</legend>
                {filterIngredients.map((item) => (
                  <label key={item.id} className="label">
                    <input type="checkbox" className="checkbox" onChange={() => toggle(item.id)} />
                    {item.name}
                  </label>
                ))}
              </fieldset>
            );
          })}
        </section>
      </>
    );
  }
};

export default IngredientCategory;
