import Header from "../components/headers";
import DeathTable from "../components/deathTable";

const TopDeaths = () => {
  return (
    <>
      <Header />
      <div className="guild-name">Top Deaths</div>
      <DeathTable apiRoute={"/topDeaths"} />
    </>
  );
};

export default TopDeaths;
