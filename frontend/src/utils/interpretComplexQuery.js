import axios from 'axios';

import { searchForTrack } from './searchForTrack';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_APIKEY;

// Function to interpret complex queries using GPT-3.5-turbo or GPT-4
const interpretComplexQuery = async (query, authToken) => {
  const numSongs = 5;
  console.log('Asking ChatGPT!');
  try {
    let data = JSON.stringify({
      // "model": "gpt-3.5-turbo",
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant that will be the DJ"
        },
        {
          "role": "user",
          "content": `Interpret the following music-related query and suggest a list of ${numSongs} songs: "${query}". Just give the songs in the format song$$song$$song. Do not include anything else in your response.`
        }
      ]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      data: data
    };

    const response = await axios.request(config);
    console.log(response.data);

    // parse the response to get the song titles
    const songTitles = response.data.choices[0].message.content.split('$$');
    
    // search for each song and get the URIs
    const trackUris = await Promise.all(songTitles.map(async (title) => {
      return await searchForTrack(title, authToken);
    }));

    // filter out any null URIs (in case some songs weren't found)
    const validTrackUris = trackUris.filter(uri => uri !== null);

    return validTrackUris;

  } catch (error) {
    console.error('Error interpreting the complex query:', error);
    return [];
  }
};

export { interpretComplexQuery };
