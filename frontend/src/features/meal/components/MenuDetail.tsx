// pages/MenuDetail.tsx
import { useParams } from 'react-router-dom';
import { thaiMenu } from '../../../utils/menu';

const MenuDetail = () => {
  const { id } = useParams();

  const menuItem = thaiMenu.find((item) => item.id === Number(id));

  if (!menuItem) return <div>Not found</div>;

  return (
    <div className="container mx-auto p-4">
      <img className="w-full md:max-w-3/4" src={menuItem.image} alt={menuItem.name} />
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2 mt-4 text-6xl">{menuItem.name}</h1>
      </div>
      <div className="mb-6">
        <p className="text-base leading-relaxed">{menuItem.description}</p>
      </div>

      <section className="grid grid-cols-2 ">
        <div>
          <h1 className="mb-4 text-4xl font-semibold">วัตถุดิบ</h1>
          {menuItem.baseIngredients.map((item) => {
            return (
              <ul className="flex gap-2 mb-2 flex-wrap">
                <li className="list-disc list-inside">{item.name}</li>
                <li className="font-bold">{item.quantity}</li>
                <li>{item.unit}</li>
              </ul>
            );
          })}
        </div>
        <div>
          <h1 className="mb-4 text-4xl font-semibold">วิธีการทำ</h1>
          {menuItem.steps.map((item) => {
            return (
              <ul className="flex gap-2 mb-4">
                <li className="font-bold">{item.step}</li>
                <li>{item.instruction}</li>
              </ul>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MenuDetail;
