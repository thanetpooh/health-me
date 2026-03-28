import Pagination from '../components/Pagination';
import IngredientCategory from '../features/ingredient/components/IngredientCategory';
import SearchBar from '../features/ingredient/components/SearchBar';
import MealCard from '../features/meal/components/MealCard';

const Home = () => {
  return (
    <>
      <div className="container mx-auto p-4 ">
        <div className="flex flex-col gap-6">
          <SearchBar />
          <IngredientCategory />
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Home;
