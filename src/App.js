
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Track from "./components/Track";
import Playlist from "./components/Playlist";

const App = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [playlist, setPlaylist] = useState([
    {
      name: "Hallucinating",
      artist: "Future",
      music: "./music/Hallucinating.mp3",
    },
    {
      name: "Prada dem",
      artist: "Gunna x Offset",
      music: "./music/Prada dem.mp3",
    },
  ]);

  const currTrack = useRef(new Audio());
  const seekSlider = useRef(null);
  const volumeSlider = useRef(null);
  const [currTime, setCurrTime] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");

  useEffect(() => {
    loadTrack(trackIndex);
  }, [trackIndex]);

  useEffect(() => {
    const audio = currTrack.current;
    const updateTime = () => {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      setCurrTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      if (seekSlider.current) {
        seekSlider.current.value = (audio.currentTime / audio.duration) * 100;
      }
    };

    const updateDuration = () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      setTotalDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", nextTrack);
    random_bg_color();

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", nextTrack);
      random_bg_color();
    };
  }, [trackIndex, isPlaying]);

  const loadTrack = (index) => {
    const track = playlist[index];
    currTrack.current.src = track.music;
    currTrack.current.load();
    playTrack(); 
  };

  const playTrack = () => {
    currTrack.current.play().catch(() => {
      console.error("Failed to play the track.");
    });
    setIsPlaying(true);
    document.getElementById("wave").classList.add("loader");
    document.querySelector(".track-art").classList.add("stroke-style");
  };

  const pauseTrack = () => {
    currTrack.current.pause();
    setIsPlaying(false);
    document.getElementById("wave").classList.remove("loader");
    document.querySelector(".track-art").classList.remove("stroke-style");
  };

  const playpauseTrack = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const nextTrack = () => {
    if (isRandom) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setTrackIndex(randomIndex);
    } else {
      setTrackIndex((prevIndex) =>
        prevIndex < playlist.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  const prevTrack = () => {
    setTrackIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : playlist.length - 1
    );
  };

  const seekTo = () => {
    const seekto = currTrack.current.duration * (seekSlider.current.value / 100);
    currTrack.current.currentTime = seekto;
  };

  const setVolume = () => {
    currTrack.current.volume = volumeSlider.current.value / 100;
  };

  const setVolumeToMax = () => {
    if (volumeSlider.current) {
      volumeSlider.current.value = 100;
      setVolume();
    }
  };

  const setVolumeToMin = () => {
    if (volumeSlider.current) {
      volumeSlider.current.value = 0;
      setVolume();
    }
  };

  function random_bg_color() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;
 
    function populate(a) {
      for (let i = 0; i < 6; i++) {
        let x = Math.round(Math.random() * 14);
        let y = hex[x];
        a += y;
      }
      return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';
 
    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ',' + Color2 + ')';
    document.body.style.background = gradient;
  }

  const handleFiles = (files) => {
    const newTracks = Array.from(files).map((file) => ({
      name: file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name,
      artist: file.name,
      music: URL.createObjectURL(file),
    }));
    setPlaylist((prevPlaylist) => [...prevPlaylist, ...newTracks]);
  };

  return (
    <div className="player">
      <div className="wrapper">
        <Track
          trackIndex={trackIndex}
          isPlaying={isPlaying}
          isRandom={isRandom}
          setIsRandom={setIsRandom}
          track={playlist[trackIndex]}
          playpauseTrack={playpauseTrack}
          nextTrack={nextTrack}
          prevTrack={prevTrack}
          seekSlider={seekSlider}
          volumeSlider={volumeSlider}
          setVolumeToMax={setVolumeToMax}
          setVolumeToMin={setVolumeToMin}
          seekTo={seekTo}
          setVolume={setVolume}
          currTime={currTime}
          totalDuration={totalDuration}
          handleFiles={handleFiles}
          totalTracks={playlist.length}
        />
        <Playlist
          playlist={playlist}
          setTrackIndex={setTrackIndex}
          trackIndex={trackIndex}
        />
      </div>
    </div>
  );
};

export default App;


