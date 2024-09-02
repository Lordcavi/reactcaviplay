import React from "react";
import volUp from './images/volume-up.svg';
import volDown from './images/volume-down.svg';
import prev from './images/previous.svg';
import next from './images/next.svg';
import upload from './images/add music.svg';
import shuffle from './images/shuffle.svg';
import shuffle2 from './images/shuffle2.svg';
import playIcon from './images/play.svg';
import pauseIcon from './images/pause.svg';

const Track = ({
  track,
  isPlaying,
  isRandom,
  setIsRandom,
  playpauseTrack,
  nextTrack,
  prevTrack,
  seekSlider,
  volumeSlider,
  seekTo,
  setVolume,
  currTime,
  totalDuration,
  handleFiles,
  setVolumeToMax,
  setVolumeToMin,
  trackIndex, 
  totalTracks 
  
}) => {
  return (
    <div className="details">
      <div className="now-playing">
        Playing Track  {trackIndex +1} of {totalTracks}
       
      </div>
      <div className="arts-vol">
        <div className="slider_container vol-slider">
        <img 
            src={volUp} 
            alt="volume-up" 
            width="22" 
            id="loud" 
            onClick={setVolumeToMax}
          />
          <input
            type="range"
            style={{ writingMode: "vertical-lr", direction: "rtl" }}
            min="1"
            max="100"
            defaultValue="100"
            className="volume_slider"
            ref={volumeSlider}
            onChange={setVolume}
          />
          <img 
            src={volDown} 
            alt="volume-down" 
            title="mute" 
            width="20" 
            id="mute" 
            onClick={setVolumeToMin}
          />
        </div>

        <div className="track-art">
          <div id="wave">
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
          </div>
        </div>

        <div className="buttons">
          <div className="random-track" onClick={() => setIsRandom(!isRandom)}>
            <img src={isRandom ? shuffle2 : shuffle} alt="random-track" width="25" id="ranIcon" />
          </div>
          <div className="prev-track" onClick={prevTrack}>
            <img src={prev} alt="prev-track" width="25" />
          </div>
          <div className="playpause-track" onClick={playpauseTrack}>
            <img src={isPlaying ? pauseIcon : playIcon} alt="play-pause" width="25" />
          </div>
          <div className="next-track" onClick={nextTrack}>
            <img src={next} alt="next-track" width="25" />
          </div>
          <div className="upload-tracks">
            <input
              type="file"
              id="fileInput"
              multiple
              accept="audio/*"
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
            <img
              src={upload}
              alt="upload-tracks"
              width="25"
              onClick={() => document.getElementById("fileInput").click()}
            />
          </div>
        </div>
      </div>

      <div className="track-name">
        <marquee>{track.name}</marquee>
      </div>
      

      <div className="slider_container">
        <div className="current-time">{currTime}</div>
        <input
          type="range"
          min="1"
          max="100"
          defaultValue="0"
          className="seek_slider"
          ref={seekSlider}
          onChange={seekTo}
        />
        <div className="total-duration">{totalDuration}</div>
      </div>
    </div>
  );
};

export default Track;
