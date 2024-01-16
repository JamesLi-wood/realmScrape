import Header from "../components/headers";
import { useEffect, useState } from "react";

const TopCharacters = () => {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("https://realmscrape.onrender.com/topCharacters")
      .then((res) => (res.ok ? res.json() : false))
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  function displayHeaders() {
    return (
      <thead>
        <tr>
          <th>Place</th>
          <th>Sprite</th>
          <th>Name</th>
          <th>Base Fame</th>
          <th>Class</th>
          <th>Equipments</th>
        </tr>
      </thead>
    );
  }

  function display() {
    return (
      <tbody>
        {backendData.map((character, idx) => {
          return (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <span
                  className="sprite"
                  style={{ backgroundPosition: character.sprite }}
                ></span>
              </td>
              <td>{character.name}</td>
              <td>{character.baseFame}</td>
              <td>{character.class}</td>
              <td>
                {character.equipments.map((position, idx) => {
                  return (
                    <span
                      key={idx}
                      className="equipment"
                      style={{ backgroundPosition: position }}
                    ></span>
                  );
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  return (
    <>
      <Header />
      <div className="guild-name">Top Characters</div>
      {backendData ? (
        <table className="graveyard">
          {display()}
          {displayHeaders()}
        </table>
      ) : (
        <div className="graveyard">We are having trouble receiving data.</div>
      )}
    </>
  );
};

export default TopCharacters;
