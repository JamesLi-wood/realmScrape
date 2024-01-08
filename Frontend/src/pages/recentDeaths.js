import Header from "../components/headers";
import DeathTable from "../components/deathTable";

const RecentDeaths = () => {
  return (
    <>
      <Header />
      <div className="guild-name">Recent Deaths</div>
      <DeathTable apiRoute={"/recentDeaths"} />
    </>
  );
};

export default RecentDeaths;
