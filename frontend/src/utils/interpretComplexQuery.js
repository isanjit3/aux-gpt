import { searchForTrack } from './searchForTrack';
import axios from 'axios';

//import openai from OpenAI();
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_APIKEY

// Function to interpret complex queries using GPT-3
const interpretComplexQuery = async (query, authToken) => {
  console.log('Asking ChatGPT!');
  try {
    console.log("Entered try")
    let data = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant that will be the DJ"
        },
        {
          "role": "user",
          "content": `Interpret the following music-related query and suggest a list of 20 songs: "${query}"`
        }
      ]
    });

    console.log('query: ', query)
    console.log('data: ', data)
    console.log(OPENAI_API_KEY)

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

    console.log('config: ', config)

    axios.request(config)
      .then((response) => {
        console.log(response)
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    /*
  const interpretedText = gptResponse.data.choices[0].text.trim();
  console.log('Interpreted Text: ', interpretedText)
  // Logic to parse the interpreted text and extract song titles or keywords
  const songTitlesOrSearchTerms = parseInterpretedText(interpretedText);

  // Now search for each song or term and compile a list of track URIs
  const trackUris = [];
  for (const term of songTitlesOrSearchTerms) {
    const trackUri = await searchForTrack(term, authToken);
    if (trackUri) {
      trackUris.push(trackUri);
    }
  }

  // Return the full list of track URIs to queue
  return trackUris;
  */
  } catch (error) {
    console.error('Error interpreting the complex query:', error);
    return [];
  }
};

// Dummy function to parse the interpreted text from GPT-3
// This is a placeholder and should be replaced with actual logic to parse the text
const parseInterpretedText = (interpretedText) => {
  // Implement parsing logic based on the structure of the GPT-3 response
  // For example, if GPT-3 returns a comma-separated list of song titles, split by commas
  return interpretedText.split(',').map(title => title.trim());
};

export { interpretComplexQuery, parseInterpretedText };