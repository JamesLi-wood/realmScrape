import { Link } from "react-router-dom";
import "./headers.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/recentDeaths">RECENT DEATHS</Link>
          </li>
          <li>
            <Link to="/topDeaths">TOP DEATHS</Link>
          </li>
          <li>
            <Link to="/topCharacters">TOP CHARACTERS</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
