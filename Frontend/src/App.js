import Home from "./pages/home";
import RecentDeaths from "./pages/recentDeaths";
import TopDeaths from "./pages/topDeaths";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/recentDeaths" element={<RecentDeaths />}></Route>
        <Route path="/topDeaths" element={<TopDeaths />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
