import React from 'react';

function Player({ currentTrack, onScrub, onPlayPause, onSkipNext, onSkipPrevious }) {
  // You will fill in the event handlers and state based on Spotify's SDK later
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
      {/* Scrubber and controls */}
    </div>
  );
}

export default Player;
