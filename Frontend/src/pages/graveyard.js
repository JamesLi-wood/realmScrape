import "./graveyard.css";
import { useEffect, useState } from "react";
import Header from "../components/headers";

const Graveyard = () => {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/graveyard")
      .then((res) => (res.ok ? res.json() : false))
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  function displayHeaders() {
    return (
      <thead>
        <tr>
          <th>Sprite</th>
          <th>Name</th>
          <th>Died On</th>
          <th>Base Fame</th>
          <th>Total Fame</th>
          <th>Equipment</th>
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
                {character.equipments &&
                  character.equipments.map((position, idx) => {
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
      <Header />
      <div className="guild-name">FriendSHlP Graveyard</div>
      {backendData ? (
        <table className="graveyard">
          {displayHeaders()}
          {display()}
        </table>
      ) : (
        <div className="graveyard">We are having trouble receiving data.</div>
      )}
    </>
  );
};

export default Graveyard;
