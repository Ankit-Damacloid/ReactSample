import { Fragment, useEffect, useState } from "react";
import { FETCH_PLAYER_URL } from "../constants/PlayerConstant";
import PlayerCard from "./PlayerCard";
import "../index.css";
const PlayerList = () => {
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);
  const [hasSearchResult, setHasSearchResult] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(FETCH_PLAYER_URL, {
      signal: controller.signal,
    })
      .then((data) => data.json())
      .then(({ playerList }) => {
        const sortedPlayer = playerList?.sort((a, b) => a.Value - b.Value);
        setPlayerList(sortedPlayer);
        setFilteredPlayerList(sortedPlayer);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => controller.abort();
  }, []);

  const searchPlayer = () => {
    if (searchText) {
      const filteredPlayer = playerList.filter((player) => {
        return (
          player.PFName.toLowerCase().includes(
            searchText.toLocaleLowerCase()
          ) ||
          player.TName.toLowerCase().includes(searchText.toLocaleLowerCase())
        );
      });
      if (!filteredPlayer.length) {
        setHasSearchResult(false);
        return setFilteredPlayerList(playerList);
      }
      if (!hasSearchResult) setHasSearchResult(true);
      setFilteredPlayerList(filteredPlayer);
    }
  };
  return (
    <>
      <div className="search-container">
        <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (!e.target.value) setFilteredPlayerList(playerList);
          }}
        />
        <button onClick={searchPlayer}>Search</button>
      </div>
      {!hasSearchResult ? (
        <p className="text-center">Opps!... No Search Result Found</p>
      ) : null}
      <div className="player-container">
        {filteredPlayerList.length > 0 ? (
          filteredPlayerList.map((player) => (
            <PlayerCard key={player.Id} player={player} />
          ))
        ) : (
          <h2 className="text-center">loading player details...</h2>
        )}
      </div>
    </>
  );
};

export default PlayerList;
