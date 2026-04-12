import IngredientCategory from '../features/ingredient/components/IngredientCategory';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <div className="container mx-auto p-4 ">
        <div className="flex flex-col gap-6">
          <Navbar />
          <IngredientCategory />
        </div>
      </div>
    </>
  );
};

export default Home;
