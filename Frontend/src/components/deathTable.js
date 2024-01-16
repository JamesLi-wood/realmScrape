import { useEffect, useState } from "react";
import "./deathTable.css";

const DeathTable = (props) => {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch(props.apiRoute)
      .then((res) => (res.ok ? res.json() : false))
      .then((data) => {
        setBackendData(data);
      });
  }, [props.apiRoute]);

  console.log(props.apiRoute);
  console.log(backendData);

  function displayHeaders() {
    return (
      <thead>
        <tr>
          <th>Sprite</th>
          <th>Name</th>
          <th>Died On</th>
          <th>Base Fame</th>
          <th>Total Fame</th>
          <th>Equipments</th>
          <th>Stats</th>
          <th>Killed by</th>
        </tr>
      </thead>
    );
  }

  function display() {
    return (
      <tbody>
        {backendData.map((character) => {
          return (
            <tr key={character._id}>
              <td>
                <span
                  className="sprite"
                  style={{ backgroundPosition: character.sprite }}
                ></span>
              </td>
              <td>{character.name}</td>
              <td>{character.deathDate}</td>
              <td>{character.baseFame}</td>
              <td>{character.totalFame}</td>
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
              <td>{character.stats}</td>
              <td>{character.diedTo}</td>
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
          {display()}
          {displayHeaders()}
        </table>
      ) : (
        <div className="graveyard">We are having trouble receiving data.</div>
      )}
    </>
  );
};

export default DeathTable;
