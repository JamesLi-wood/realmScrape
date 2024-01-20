import { Link } from "react-router-dom";
import "./headers.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/">
                <button className="header-button">HOME</button>
              </Link>
            </li>
            <li>
              <Link to="/recentDeaths">
                <button className="header-button">RECENT DEATHS</button>
              </Link>
            </li>
            <li>
              <Link to="/topDeaths">
                <button className="header-button">TOP DEATHS</button>
              </Link>
            </li>
            <li>
              <Link to="/topCharacters">
                <button className="header-button">TOP CHARACTERS</button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="break"></div>
    </>
  );
};

export default Header;
