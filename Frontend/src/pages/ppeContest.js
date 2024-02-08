import Header from "../components/headers";
import AliveTable from "../components/aliveTable";
import { Link } from "react-router-dom";

const PpeContest = () => {
  // Change apiRoute later.
  return (
    <>
      <Header />
      <h1 className="h1-title">Ppe Contest</h1>
      <Link to="/ppeContestRules" className="rules">
        Rules
      </Link>
      <AliveTable apiRoute={"/topCharacters"} />
    </>
  );
};

export default PpeContest;
