import { Link } from 'react-router-dom';

type MenuWithImage = {
  id: number;
  name: string;
  imageUrl: string | null;
};

type Props = {
  menu: MenuWithImage;
};

const MealCard = ({ menu }: Props) => {
  return (
    <>
      <div className="card bg-base-100 shadow-sm">
        <p>{menu.name}</p>

        <figure>
          <Link to={`/menu/${menu.id}`}>
            <img src={menu.imageUrl ?? undefined} width={600} height={400} alt="Image Alt" />
          </Link>
        </figure>
      </div>
    </>
  );
};

export default MealCard;
