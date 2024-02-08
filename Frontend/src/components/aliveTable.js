import { useState, useEffect } from "react";
import "./deathTable.css";

const AliveTable = (props) => {
  const [backendData, setBackendData] = useState(false);

  useEffect(() => {
    fetch(`https://realmscrape.onrender.com${props.apiRoute}`)
      .then((res) => (res.ok ? res.json() : false))
      .then((data) => {
        setBackendData(data);
      });
  }, [props.apiRoute]);

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
      {backendData ? (
        <table className="graveyard">
          {displayHeaders()}
          {display()}
        </table>
      ) : (
        <div className="loading">Loading . . .</div>
      )}
    </>
  );
};

export default AliveTable;
