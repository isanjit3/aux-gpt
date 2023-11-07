// function to search for a track
const searchForTrack = async (searchQuery, authToken) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.tracks && data.tracks.items.length > 0) {
      // Return the URI of the first track in the search results
      return data.tracks.items[0].uri;
    } else {
      console.error('No tracks found for the search query:', searchQuery);
      return null;
    }
  } catch (error) {
    console.error('Error searching for track', error);
    return null;
  }
};

export { searchForTrack };