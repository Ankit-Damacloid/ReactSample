import "../index.css";

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <img
        className="player-image"
        src={`/images/player-images/${player?.Id}.jpg`}
        alt="footbal player photo"
      ></img>
      <ul>
        <li>{player?.PFName}</li>
        <li>{player?.SkillDesc}</li>
        <li>{`$${player?.Value}`}</li>
        {player?.UpComingMatchesList[0]?.CCode ? (
          <li>{`Upcoming Match - ${player?.UpComingMatchesList[0]?.CCode} vs ${player?.UpComingMatchesList[0]?.VsCCode}`}</li>
        ) : null}
        {player?.UpComingMatchesList[0]?.MDate ? (
          <li>{`Next Match Time - ${new Date(
            player?.UpComingMatchesList[0]?.MDate + " UTC"
          ).toLocaleString()}`}</li>
        ) : null}
      </ul>
    </div>
  );
};

export default PlayerCard;
