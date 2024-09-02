import React from "react";

const Playlist = ({ playlist, setTrackIndex, trackIndex }) => {
  return (
    <div className="player-playlist">
      <ul id="playlist">
        {playlist.map((track, index) => (
          <li
            key={index}
            className={index === trackIndex ? "active" : ""}
            onClick={() => setTrackIndex(index)}
          >
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
