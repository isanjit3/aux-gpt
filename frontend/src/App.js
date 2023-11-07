import React from 'react';
import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

// components
import Login from './components/Login';
import Player from './components/Player';
import Queue from './components/Queue';
import ChatBox from './components/ChatBox';


function App() {
  const [authToken, setAuthToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState({});
  // const [currentPlaybackInfo, setCurrentPlaybackInfo] = useState(null); // Can remove this I think -- using currentTrack hook
  const [queue, setQueue] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // Check for an existing auth token when the app loads
  useEffect(() => {
    // Function to parse the hash from the URL
    const parseHash = (hash) => {
      return hash.substring(1).split('&').reduce((initial, item) => {
        if (item) {
          let parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    };
  
    // Parse the hash from the URL
    const hash = parseHash(window.location.hash);
    const token = hash.access_token;
  
    if (token) {
      // Save the token in local storage and update the state
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      console.log(`Access Token Set: ${token}`)
      window.history.pushState("", document.title, window.location.pathname);
    }
  }, []);
  
  // Handlers for the Player component
  // Handler to toggle play/pause
  const handlePlayPause = () => {
    console.log('Play/Pause clicked')
    axios.put(`https://api.spotify.com/v1/me/player/${isPlaying ? 'pause' : 'play'}`, {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      setIsPlaying(!isPlaying); // Toggle the playing state
    })
    .catch(error => {
      console.error('Error toggling play/pause', error);
    });
  };
  // Handler to skip to the next track
  const handleSkipNext = () => {
    console.log('Skip next clicked')
    axios.post('https://api.spotify.com/v1/me/player/next', {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      fetchCurrentPlaying(); // Fetch the new current playing track
    })
    .catch(error => {
      console.error('Error skipping to next track', error);
    });
  };
  // Handler to skip to the previous track
  const handleSkipPrevious = () => {
    console.log('Skip previous clicked')
    axios.post('https://api.spotify.com/v1/me/player/previous', {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      fetchCurrentPlaying(); // Fetch the new current playing track
    })
    .catch(error => {
      console.error('Error skipping to previous track', error);
    });
  };
  const handleScrub = (e) => {
    console.log('Song scrubbed')
    const newPositionMs = 1000/* calculate position in milliseconds based on scrubber value */;
    axios.put(`https://api.spotify.com/v1/me/player/seek?position_ms=${newPositionMs}`, {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      // Update your state accordingly
    })
    .catch(error => {
      console.error('Error seeking to position', error);
    });
  };
  // Handler for the ChatBox component
  const handleSubmitPrompt = (prompt) => {
    axios.post('http://localhost:3001/api/queue', { prompt }, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      // Update your queue state with the new songs
      setQueue(response.data.queue);
    })
    .catch(error => {
      console.error('Error submitting prompt', error);
    });
  };

  // Utility function to fetch the current playing track
  const fetchCurrentPlaying = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.data) {
        setCurrentTrack({
          songTitle: response.data.item.name,
          artist: response.data.item.artists.map(artist => artist.name).join(', '),
          albumImageUrl: response.data.item.album.images[2].url, // 2 for the smaller one
          progressMs: response.data.progress_ms
        });
      }
    } catch (error) {
      console.error('Error fetching current playing track:', error);
    }
  };

  // Fetch the queue when the app loads
  useEffect(() => {
    if (authToken) {
      const interval = setInterval(() => {
        fetchCurrentPlaying();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [authToken]);

  return (
    <div>
      {!authToken ? (
        <Login />
      ) : (
        <>
          <Player
            currentTrack={currentTrack}
            Scrub={handleScrub}
            onPlayPause={handlePlayPause}
            onSkipNext={handleSkipNext}
            onSkipPrevious={handleSkipPrevious}
          />
          <Queue queue={queue} />
          <ChatBox onSubmitPrompt={handleSubmitPrompt} />
        </>
      )}
    </div>
  );
}

export default App;
