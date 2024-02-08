import Header from "../components/headers";
import DeathTable from "../components/deathTable";

const RecentDeaths = () => {
  return (
    <>
      <Header />
      <h1 className="h1-title">Recent Deaths</h1>
      <DeathTable apiRoute={"/recentDeaths"} />
    </>
  );
};

export default RecentDeaths;
