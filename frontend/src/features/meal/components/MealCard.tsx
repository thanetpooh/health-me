import { Link } from 'react-router-dom';

type MealCardProps = {
  menu: {
    id: number;
    name: string;
    image: string;
    category: string;
    description: string;
  };
};

const MealCard = ({ menu }: MealCardProps) => {
  return (
    <>
      <div className="card bg-base-100 shadow-sm">
        <figure>
          <Link to={`/menu/${menu.id}`}>
            <img src={menu.image} width={600} height={400} alt="Image Alt" />
          </Link>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{menu.name}</h2>
          <p
            className="card-title text-sm text-gray-400
"
          >
            {menu.description}
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline ">{menu.category}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealCard;
