import { searchForTrack } from './searchForTrack';

const OpenAI = require('openai-api');
console.log(process.env)
const openai = new OpenAI(process.env.REACT_APP_OPENAI_SECRET);


// Function to interpret complex queries using GPT-3
const interpretComplexQuery = async (query, authToken) => {
  try {
    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: `Interpret the following music-related query and suggest a list of 20 songs: "${query}"`,
      maxTokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

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