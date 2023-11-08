import React from 'react';

function Player({ currentTrack, /*onScrub,*/ onPlayPause, onSkipNext, onSkipPrevious }) {
  // You will fill in the event handlers and state based on Spotify's SDK later
  // Event handlers for the playback controls
  /*
  console.log(`Currently Playing Track:
    Song: ${currentTrack.songTitle}
    Artist: ${currentTrack.artist}
    Album Art: ${currentTrack.albumImageUrl}
    Progress (ms): ${currentTrack.progressMs}
    Duration (ms): ${currentTrack.durationMs}`);
  */
  
    /*
  const normalizedProgress = (currentTrack.progressMs / currentTrack.durationMs) * 100;
  const handleScrubChange = (e) => {
    const newProgress = Math.round((e.target.value / 100) * currentTrack.durationMs);
    onScrub(newProgress); // You'll need to implement onScrub to seek to the new position
  };
  */
    
  return (
    <div>
      <img src={currentTrack.albumImageUrl} alt="Album cover" />
      <h2>{currentTrack.songTitle}</h2>
      <h3>{currentTrack.artist}</h3>
      {/* Scrubber */}
      {/* <input type="range" min="0" max="100" value={normalizedProgress} onChange={handleScrubChange} /> */}
      {/* Controls */}
      {/* <button onClick={onPlayPause}>Play/Pause</button> */}
      <button onClick={onSkipPrevious}>Previous</button>
      <button onClick={onSkipNext}>Next</button>
    </div>
  );
}

export default Player;
