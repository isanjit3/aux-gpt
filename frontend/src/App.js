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
  const [queue, setQueue] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Check for an existing auth token when the app loads
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token Set: ', token)
    setAuthToken(token);
  }, []);

  // Handlers for the Player component
  const handlePlayPause = () => {
    // Call Spotify API to play/pause the music
  };

  const handleSkipNext = () => {
    // Call Spotify API to skip to the next track
  };

  const handleSkipPrevious = () => {
    // Call Spotify API to skip to the previous track
  };

  const handleScrub = (e) => {
    // Call Spotify API to seek to the position in the song
  };

  // Handler for the ChatBox component
  const handleSubmitPrompt = (prompt) => {
    setUserInput(prompt);
    // Call your backend API to process the prompt and update the queue
  };

  // Fetch current playing song and queue from Spotify
  const fetchCurrentPlaying = () => {
    // Use axios to call your backend, which will then call Spotify's API
  };

  // Fetch the queue when the app loads
  useEffect(() => {
    if (authToken) {
      fetchCurrentPlaying();
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
            onScrub={handleScrub}
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
