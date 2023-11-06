import React from 'react';

function Player({ currentTrack, onScrub, onPlayPause, onSkipNext, onSkipPrevious }) {
  // You will fill in the event handlers and state based on Spotify's SDK later
  return (
    <div>
      <img src={currentTrack.albumImageUrl} alt="Album cover" />
      <h2>{currentTrack.name}</h2>
      {/* Scrubber */}
      <input type="range" min="0" max="100" value="0" onChange={onScrub} />
      {/* Controls */}
      <button onClick={onPlayPause}>Play/Pause</button>
      <button onClick={onSkipPrevious}>Previous</button>
      <button onClick={onSkipNext}>Next</button>
    </div>
  );
}

export default Player;
