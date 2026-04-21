import { Link } from 'react-router-dom';
import type { MenuSummary } from '../../../hooks/useMenus';

type Props = {
  menu: MenuSummary;
};

const MealCard = ({ menu }: Props) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-base-200">
      <figure className="relative aspect-video overflow-hidden">
        <Link to={`/menu/${menu.id}`} className="w-full h-full">
          <img
            src={menu.imageUrl}
            alt={menu.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </figure>

      <div className="card-body p-4 gap-1">
        <h2 className="card-title text-lg font-bold truncate">{menu.name}</h2>
        <p className="text-sm text-base-content/70">
          มีวัตถุดิบ:{' '}
          <span className="font-semibold text-primary">
            {menu.availableIngredients}/{menu.totalIngredients}
          </span>{' '}
          อย่าง
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
