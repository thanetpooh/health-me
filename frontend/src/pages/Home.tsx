import RecipeFinder from '../features/ingredient/components/RecipeFinder';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <div className="container mx-auto p-4 ">
        <div className="flex flex-col gap-6">
          <Navbar />
          <RecipeFinder />
        </div>
      </div>
    </>
  );
};

export default Home;
