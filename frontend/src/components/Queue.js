import React from 'react';

function Queue({ queue }) {
  return (
    <ul>
      {queue.map((track, index) => (
        <li key={index}>{track.name} by {track.artist}</li>
      ))}
    </ul>
  );
}

export default Queue;
