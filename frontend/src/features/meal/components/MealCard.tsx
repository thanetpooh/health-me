import { Link } from 'react-router-dom';

type MenuWithImage = {
  id: number;
  name: string;
  imageUrl: string | null;
  ingredientNeed: number;
};

type Props = {
  menu: MenuWithImage;
};

const MealCard = ({ menu }: Props) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-base-200">
      <figure className="relative aspect-video overflow-hidden">
        <Link to={`/menu/${menu.id}`} className="w-full h-full">
          <img
            src={menu.imageUrl ?? 'https://placehold.co/600x400?text=No+Image'}
            alt={menu.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </figure>

      <div className="card-body p-4 gap-1">
        <h2 className="card-title text-lg font-bold truncate">{menu.name}</h2>
        <p className="text-sm text-base-content/70">
          วัตถุดิบที่ต้องการ: <span className="font-semibold text-primary">{menu.ingredientNeed}</span> อย่าง
        </p>

        <div className="card-actions justify-end mt-2">
          <Link to={`/menu/${menu.id}`} className="btn btn-primary btn-sm">
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
