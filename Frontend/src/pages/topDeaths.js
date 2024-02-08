import Header from "../components/headers";
import DeathTable from "../components/deathTable";

const TopDeaths = () => {
  return (
    <>
      <Header />
      <h1 className="h1-title">Top Deaths</h1>
      <DeathTable apiRoute={"/topDeaths"} />
    </>
  );
};

export default TopDeaths;
