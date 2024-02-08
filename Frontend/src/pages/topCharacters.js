import Header from "../components/headers";
import AliveTable from "../components/aliveTable";

const TopCharacters = () => {
  return (
    <>
      <Header />
      <h1 className="h1-title">Top Characters</h1>
      <AliveTable apiRoute={"/topCharacters"} />
    </>
  );
};

export default TopCharacters;
