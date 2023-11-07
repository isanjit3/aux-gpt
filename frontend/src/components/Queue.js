import React from 'react';

function Queue({ queue }) {
  //console.log(`Queue: ${queue}`);
  // Only take the first 5 items from the queue for display
  const displayQueue = queue.slice(0, 5);

  return (
    <ul>
      {displayQueue.map((track, index) => (
        <li key={index}>
          {track && track.name ? track.name : 'Unknown Track'} by 
          {track && track.artists 
            ? track.artists.map((artist) => artist.name).join(', ') 
            : 'Unknown Artist'}
        </li>
      ))}
    </ul>
  );
}

export default Queue;
