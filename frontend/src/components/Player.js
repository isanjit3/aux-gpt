import React from 'react';

function Player({ currentTrack, onScrub, onPlayPause, onSkipNext, onSkipPrevious }) {
  // You will fill in the event handlers and state based on Spotify's SDK later
  // Event handlers for the playback controls
  console.log(`Currently Playing Track:
    Song: ${currentTrack.songTitle}
    Artist: ${currentTrack.artist}
    Album Art: ${currentTrack.albumImageUrl}
    Progress (ms): ${currentTrack.progressMs}`)
    
  return (
    <div>
      <img src={currentTrack.albumImageUrl} alt="Album cover" />
      <h2>{currentTrack.songTitle}</h2>
      <h3>{currentTrack.artist}</h3>
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
