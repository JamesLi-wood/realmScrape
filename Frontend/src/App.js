import "./global.css";
import Home from "./pages/home";
import RecentDeaths from "./pages/recentDeaths";
import TopDeaths from "./pages/topDeaths";
import TopCharacters from "./pages/topCharacters";
import PpeContest from "./pages/ppeContest";
import Rules from "./pages/rules";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/recentDeaths" element={<RecentDeaths />}></Route>
        <Route path="/topDeaths" element={<TopDeaths />}></Route>
        <Route path="/topCharacters" element={<TopCharacters />}></Route>
        <Route path="/ppeContest" element={<PpeContest />}></Route>
        <Route path="/ppeContestRules" element={<Rules />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
