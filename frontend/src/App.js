import React from 'react';
import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

// components
import Login from './components/Login';
import Player from './components/Player';
import Queue from './components/Queue';
import ChatBox from './components/ChatBox';

// utils
import { fetchCurrentPlaying } from './utils/fetchCurrentlyPlaying';
import { fetchQueue } from './utils/fetchQueue';
import { searchForTrack } from './utils/searchForTrack';
import { addToQueue } from './utils/addToQueue';
import { clearQueue } from './utils/clearQueue';
import { interpretComplexQuery, parseInterpretedText } from './utils/interpretComplexQuery';


const INTERVAL = 500;


function App() {
  const [authToken, setAuthToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState({});
  // const [currentPlaybackInfo, setCurrentPlaybackInfo] = useState(null); // Can remove this I think -- using currentTrack hook
  const [queue, setQueue] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (authToken) {
      const fetchPlaybackState = async () => {
        try {
          const response = await axios.get('https://api.spotify.com/v1/me/player', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (response.data && response.data.is_playing !== undefined) {
            setIsPlaying(response.data.is_playing);
          }
        } catch (error) {
          console.error('Error fetching playback state:', error);
        }
      };

      fetchPlaybackState();
    }
  }, [authToken]);

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
      // console.log(`Access Token Set: ${token}`)
      window.history.pushState("", document.title, window.location.pathname);
    }
  }, []);

  // Handlers for the Player component
  // Handler to toggle play/pause
  const handlePlayPause = async () => {
    console.log(`${isPlaying ? 'Pause' : 'Play'} clicked`);
  
    try {
      // Check for active devices first
      const devicesResponse = await axios.get('https://api.spotify.com/v1/me/player/devices', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
  
      const devices = devicesResponse.data.devices;
      const activeDevice = devices.find(device => device.is_active);
  
      if (!activeDevice) {
        console.error('No active devices found');
        return; // Exit the function if no active device is found
      }
  
      // If there's an active device, send the play/pause request
      const request = isPlaying ? 'pause' : 'play';
      await axios.put(`https://api.spotify.com/v1/me/player/${request}`, {}, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
  
      // Toggle the playing state only after the request is successful
      setIsPlaying(prevIsPlaying => !prevIsPlaying);
    } catch (error) {
      console.error('Error toggling play/pause', error);
    }
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
        fetchCurrentPlaying(setCurrentTrack, authToken); // Fetch the new current playing track
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
        fetchCurrentPlaying(setCurrentTrack, authToken); // Fetch the new current playing track
      })
      .catch(error => {
        console.error('Error skipping to previous track', error);
      });
  };

  const handleScrub = (e) => {
    console.log('Song scrubbed')
    const newPositionMs = e;
    axios.put(`https://api.spotify.com/v1/me/player/seek?position_ms=${newPositionMs}`, {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(response => {
        setCurrentTrack({
          ...currentTrack,
          progressMs: newPositionMs
        });
      })
      .catch(error => {
        console.error('Error seeking to position', error);
      });
  };


  // Fetch the song when the app loads
  useEffect(() => {
    if (authToken) {
      const interval = setInterval(() => {
        fetchCurrentPlaying(setCurrentTrack, authToken);
      }, INTERVAL);
      return () => clearInterval(interval);
    }
  }, [authToken]);

  // Fetch the song when the app loads
  useEffect(() => {
    if (authToken) {
      const interval = setInterval(() => {
        fetchQueue(setQueue, authToken);
      }, INTERVAL);
      return () => clearInterval(interval);
    }
  }, [authToken]);


  /*************************************************************************************/
  // LOGIC FOR USER INPUT

  // Function to handle user input
  const handleUserInput = async (input) => {
    // Check if the input is a specific command
    if (input.toLowerCase().includes("add") || input.toLowerCase().includes("to queue")) {
      const trackName = input.replace(/add to queue|add/i, '').trim();       // Extract the track name from the input
      // Search for the track URI based on the user's input
      const trackUri = await searchForTrack(trackName, authToken);
      if (trackUri) {
        await addToQueue(trackUri, authToken);         // Add to the queue without skipping tracks
      } else {
        console.error('Could not find the track to add to the queue');         // Handle the case where the track URI couldn't be found
      }
    } else {
      // Use NLP for more complex queries
      const trackUris = await interpretComplexQuery(input, authToken);
      console.log('TRACK URIS: ', trackUris);

      /*
      if (trackUris.length > 0) {
        // Add all tracks to the queue
        for (const trackUri of trackUris) {
          await addToQueue(trackUri, authToken); // Ensure addToQueue uses the authToken
        }
      } else {
        console.error('No tracks found for the query');
      }
      */
    }
  };

  return (
    <div>
      {!authToken ? (
        <Login />
      ) : (
        <>
          <Player
            currentTrack={currentTrack}
            onScrub={handleScrub}
            onPlayPause={handlePlayPause}
            onSkipNext={handleSkipNext}
            onSkipPrevious={handleSkipPrevious}
          />
          <ChatBox onSubmitPrompt={handleUserInput} />
          <Queue queue={queue} />
        </>
      )}
    </div>
  );
}

export default App;
