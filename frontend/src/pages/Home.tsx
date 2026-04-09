import Pagination from '../components/Pagination';
import IngredientCategory from '../features/ingredient/components/IngredientCategory';
import SearchBar from '../features/ingredient/components/SearchBar';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <div className="container mx-auto p-4 ">
        <div className="flex flex-col gap-6">
          <Navbar />
          <SearchBar />
          <IngredientCategory />
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Home;
